import { createClient } from 'npm:@supabase/supabase-js@2'

const headers = { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': 'content-type, x-player-key', 'Content-Type': 'application/json' }
type Body = { action?: 'poll' | 'ack'; device_code?: string; command_id?: string; status?: 'acknowledged' | 'failed'; error_message?: string; metadata?: Record<string, unknown> }

Deno.serve(async (request) => {
  if (request.method === 'OPTIONS') return new Response('ok', { headers })
  if (request.method !== 'POST') return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405, headers })
  const expected = Deno.env.get('PLAYER_AGENT_KEY')
  if (!expected || request.headers.get('x-player-key') !== expected) return new Response(JSON.stringify({ error: 'Unauthorized player' }), { status: 401, headers })
  let body: Body
  try { body = await request.json() } catch { return new Response(JSON.stringify({ error: 'Invalid JSON' }), { status: 400, headers }) }
  if (!body.device_code) return new Response(JSON.stringify({ error: 'device_code is required' }), { status: 422, headers })
  const admin = createClient(Deno.env.get('SUPABASE_URL')!, Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!)
  const player = await admin.from('players').select('id,display_name,state').eq('device_code', body.device_code).maybeSingle()
  if (player.error || !player.data) return new Response(JSON.stringify({ error: 'Player not found' }), { status: 404, headers })
  if (body.action === 'ack') {
    if (!body.command_id || !body.status) return new Response(JSON.stringify({ error: 'command_id and status are required' }), { status: 422, headers })
    const result = await admin.from('player_commands').update({ status: body.status, error_message: body.error_message ?? null, acknowledged_at: new Date().toISOString(), claimed_at: new Date().toISOString() }).eq('id', body.command_id).eq('player_id', player.data.id).select('id,status').single()
    if (result.error) return new Response(JSON.stringify({ error: result.error.message }), { status: 500, headers })
    if (body.status === 'failed') await admin.from('playback_events').insert({ player_id: player.data.id, event_type: 'failed', result: 'command_failed', error_message: body.error_message ?? 'Player command failed', metadata: body.metadata ?? {} })
    return new Response(JSON.stringify({ command: result.data }), { status: 200, headers })
  }
  const result = await admin.from('player_commands').select('id,command,payload,created_at').eq('player_id', player.data.id).eq('status', 'pending').order('created_at').limit(1).maybeSingle()
  if (result.error) return new Response(JSON.stringify({ error: result.error.message }), { status: 500, headers })
  if (!result.data) return new Response(JSON.stringify({ command: null }), { status: 200, headers })
  await admin.from('player_commands').update({ status: 'acknowledged', claimed_at: new Date().toISOString() }).eq('id', result.data.id).eq('status', 'pending')
  return new Response(JSON.stringify({ command: result.data }), { status: 200, headers })
})
