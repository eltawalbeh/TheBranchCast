import { createClient } from 'npm:@supabase/supabase-js@2'

const headers = { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': 'content-type, apikey, authorization', 'Content-Type': 'application/json' }
const json = (body: unknown, status = 200) => new Response(JSON.stringify(body), { status, headers })
async function hashToken(token: string) { const bytes = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(token)); return Array.from(new Uint8Array(bytes)).map((byte) => byte.toString(16).padStart(2, '0')).join('') }

Deno.serve(async (request) => {
  if (request.method === 'OPTIONS') return new Response('ok', { headers })
  if (request.method !== 'POST') return json({ error: 'Method not allowed' }, 405)
  let body: { session_token?: string; state?: 'online' | 'offline'; current_track?: string | null }
  try { body = await request.json() } catch { return json({ error: 'Invalid JSON' }, 400) }
  if (!body.session_token) return json({ error: 'session_token is required' }, 422)
  const admin = createClient(Deno.env.get('SUPABASE_URL')!, Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!)
  const tokenHash = await hashToken(body.session_token)
  const session = await admin.from('player_browser_sessions').select('id,player_id,expires_at,revoked_at').eq('token_hash', tokenHash).maybeSingle()
  if (session.error || !session.data || session.data.revoked_at || new Date(session.data.expires_at).getTime() < Date.now()) return json({ error: 'Browser player session is invalid or expired' }, 401)
  const now = new Date().toISOString()
  const player = await admin.from('players').update({ state: body.state === 'offline' ? 'offline' : 'online', last_seen_at: now, current_track: body.current_track ?? null, last_error: null }).eq('id', session.data.player_id).select('id,display_name,state,last_seen_at,current_track,zone_id').single()
  if (player.error) return json({ error: player.error.message }, 500)
  await admin.from('player_browser_sessions').update({ last_seen_at: now }).eq('id', session.data.id)
  await admin.from('player_events').insert({ player_id: session.data.player_id, event_type: 'heartbeat', payload: { source: 'browser' }, occurred_at: now })
  return json({ player: player.data, acknowledged_at: now })
})

