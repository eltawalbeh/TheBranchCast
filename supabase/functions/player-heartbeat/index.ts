import { createClient } from 'npm:@supabase/supabase-js@2'

const headers = { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': 'content-type, x-player-key', 'Content-Type': 'application/json' }
Deno.serve(async (request) => {
  if (request.method === 'OPTIONS') return new Response('ok', { headers })
  if (request.method !== 'POST') return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405, headers })
  const expected = Deno.env.get('PLAYER_AGENT_KEY')
  if (!expected || request.headers.get('x-player-key') !== expected) return new Response(JSON.stringify({ error: 'Unauthorized player' }), { status: 401, headers })
  let body: { device_code?: string; state?: 'online' | 'offline'; firmware_version?: string; agent_version?: string; current_track?: string; metadata?: Record<string, unknown> }
  try { body = await request.json() } catch { return new Response(JSON.stringify({ error: 'Invalid JSON' }), { status: 400, headers }) }
  if (!body.device_code) return new Response(JSON.stringify({ error: 'device_code is required' }), { status: 422, headers })
  const admin = createClient(Deno.env.get('SUPABASE_URL')!, Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!)
  const now = new Date().toISOString()
  const update = await admin.from('players').update({ state: body.state === 'offline' ? 'offline' : 'online', firmware_version: body.firmware_version ?? null, agent_version: body.agent_version ?? null, current_track: body.current_track ?? null, last_seen_at: now, last_error: null }).eq('device_code', body.device_code).select('id,display_name,state,last_seen_at,current_track,zone_id').maybeSingle()
  if (update.error || !update.data) return new Response(JSON.stringify({ error: update.error?.message ?? 'Player not found' }), { status: update.data ? 500 : 404, headers })
  await admin.from('player_events').insert({ player_id: update.data.id, event_type: 'heartbeat', payload: body.metadata ?? {}, occurred_at: now })
  if (body.state === 'offline') await admin.from('alerts').insert({ zone_id: update.data.zone_id, player_id: update.data.id, severity: 'high', state: 'open', title: `${update.data.display_name ?? 'Player'} is offline`, details: 'The player agent reported an offline state.' })
  return new Response(JSON.stringify({ player: update.data, acknowledged_at: now }), { status: 200, headers })
})
