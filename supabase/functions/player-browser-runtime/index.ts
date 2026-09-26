import { createClient } from 'npm:@supabase/supabase-js@2'

const headers = { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'POST, OPTIONS', 'Access-Control-Allow-Headers': 'content-type, apikey, authorization', 'Content-Type': 'application/json' }
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
  if (!result.data) return json({ command: null })
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

