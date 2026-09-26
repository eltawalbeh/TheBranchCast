import { createClient } from 'npm:@supabase/supabase-js@2'

const headers = { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'POST, OPTIONS', 'Access-Control-Allow-Headers': 'content-type, apikey, authorization, x-client-info', 'Content-Type': 'application/json' }
const json = (body: unknown, status = 200) => new Response(JSON.stringify(body), { status, headers })
async function hashToken(token: string) { const bytes = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(token)); return Array.from(new Uint8Array(bytes)).map((byte) => byte.toString(16).padStart(2, '0')).join('') }

type Body = { session_token?: string; action?: 'poll' | 'ack'; command_id?: string; status?: 'acknowledged' | 'failed'; error_message?: string }
Deno.serve(async (request) => {
  if (request.method === 'OPTIONS') return new Response('ok', { headers })
  if (request.method !== 'POST') return json({ error: 'Method not allowed' }, 405)
  let body: Body
  try { body = await request.json() } catch { return json({ error: 'Invalid JSON' }, 400) }
  if (!body.session_token) return json({ error: 'session_token is required' }, 422)
  const admin = createClient(Deno.env.get('SUPABASE_URL')!, Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!)
  const tokenHash = await hashToken(body.session_token)
  const session = await admin.from('player_browser_sessions').select('id,player_id,expires_at,revoked_at').eq('token_hash', tokenHash).maybeSingle()
  if (session.error || !session.data || session.data.revoked_at || new Date(session.data.expires_at).getTime() < Date.now()) return json({ error: 'Browser player session is invalid or expired' }, 401)
  if (body.action === 'ack') {
    if (!body.command_id || !body.status) return json({ error: 'command_id and status are required' }, 422)
    const result = await admin.from('player_commands').update({ status: body.status, error_message: body.error_message ?? null, acknowledged_at: new Date().toISOString(), claimed_at: new Date().toISOString() }).eq('id', body.command_id).eq('player_id', session.data.player_id).select('id,status').single()
    if (result.error) return json({ error: result.error.message }, 500)
    return json({ command: result.data })
  }
  const result = await admin.from('player_commands').select('id,command,payload,created_at').eq('player_id', session.data.player_id).eq('status', 'pending').order('created_at').limit(1).maybeSingle()
  if (result.error) return json({ error: result.error.message }, 500)
  if (!result.data) {
    const player = await admin.from('players').select('id,zone_id,active_schedule_entry_id,active_content_item_id').eq('id', session.data.player_id).single()
    if (player.error) return json({ error: player.error.message }, 500)
    const now = new Date().toISOString()
    const schedule = await admin.from('schedule_entries').select('id,content_item_id,campaign_id,starts_at,ends_at,campaigns(content_item_id)').eq('zone_id', player.data.zone_id).lte('starts_at', now).or(`ends_at.is.null,ends_at.gt.${now}`).order('starts_at', { ascending: false }).limit(1).maybeSingle()
    if (schedule.error) return json({ error: schedule.error.message }, 500)
    const campaign = schedule.data?.campaigns as { content_item_id?: string | null } | null
    const scheduleContentId = schedule.data?.content_item_id ?? campaign?.content_item_id ?? null
    if (schedule.data && scheduleContentId && schedule.data.id !== player.data.active_schedule_entry_id) {
      const command = await admin.from('player_commands').insert({ player_id: session.data.player_id, requested_by: null, command: 'play', payload: { content_item_id: scheduleContentId, schedule_entry_id: schedule.data.id }, status: 'pending' }).select('id,command,payload,created_at').single()
      if (command.error) return json({ error: command.error.message }, 500)
      await admin.from('players').update({ active_schedule_entry_id: schedule.data.id, active_content_item_id: scheduleContentId }).eq('id', session.data.player_id)
      result.data = command.data
    } else if (!schedule.data && player.data.active_schedule_entry_id) {
      const command = await admin.from('player_commands').insert({ player_id: session.data.player_id, requested_by: null, command: 'skip', payload: { schedule_entry_id: player.data.active_schedule_entry_id }, status: 'pending' }).select('id,command,payload,created_at').single()
      if (command.error) return json({ error: command.error.message }, 500)
      await admin.from('players').update({ active_schedule_entry_id: null, active_content_item_id: null }).eq('id', session.data.player_id)
      result.data = command.data
    } else {
      return json({ command: null })
    }
  }
  await admin.from('player_commands').update({ status: 'acknowledged', claimed_at: new Date().toISOString() }).eq('id', result.data.id).eq('status', 'pending')
  let payload = (result.data.payload ?? {}) as Record<string, unknown>
  const contentItemId = typeof payload.content_item_id === 'string' ? payload.content_item_id : null
  if (contentItemId) {
    const item = await admin.from('content_items').select('id,title,storage_path,bucket_id').eq('id', contentItemId).maybeSingle()
    if (item.error) return json({ error: item.error.message }, 500)
    if (item.data?.storage_path) {
      const signed = await admin.storage.from(item.data.bucket_id || 'audio-assets').createSignedUrl(item.data.storage_path, 3600)
      if (signed.error) return json({ error: signed.error.message }, 500)
      payload = { ...payload, audio_url: signed.data.signedUrl, title: item.data.title }
    }
  }
  return json({ command: { ...result.data, payload } })
})