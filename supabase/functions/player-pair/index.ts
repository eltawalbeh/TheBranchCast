import { createClient } from 'npm:@supabase/supabase-js@2'

const headers = { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': 'content-type, apikey, authorization', 'Content-Type': 'application/json' }
const json = (body: unknown, status = 200) => new Response(JSON.stringify(body), { status, headers })

async function hashToken(token: string) {
  const bytes = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(token))
  return Array.from(new Uint8Array(bytes)).map((byte) => byte.toString(16).padStart(2, '0')).join('')
}

Deno.serve(async (request) => {
  if (request.method === 'OPTIONS') return new Response('ok', { headers })
  if (request.method !== 'POST') return json({ error: 'Method not allowed' }, 405)
  let body: { pairing_code?: string; agent_version?: string }
  try { body = await request.json() } catch { return json({ error: 'Invalid JSON' }, 400) }
  const pairingCode = body.pairing_code?.trim().toUpperCase()
  if (!pairingCode) return json({ error: 'pairing_code is required' }, 422)

  const admin = createClient(Deno.env.get('SUPABASE_URL')!, Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!)
  const found = await admin.from('players').select('id,display_name,device_code,pairing_expires_at').eq('pairing_code', pairingCode).maybeSingle()
  if (found.error) return json({ error: found.error.message }, 500)
  if (!found.data || !found.data.pairing_expires_at || new Date(found.data.pairing_expires_at).getTime() < Date.now()) return json({ error: 'Pairing code is invalid or expired' }, 410)

  const token = `${crypto.randomUUID()}-${crypto.randomUUID()}`
  const tokenHash = await hashToken(token)
  await admin.from('player_browser_sessions').update({ revoked_at: new Date().toISOString() }).eq('player_id', found.data.id).is('revoked_at', null)
  const session = await admin.from('player_browser_sessions').insert({ player_id: found.data.id, token_hash: tokenHash }).select('id,expires_at').single()
  if (session.error) return json({ error: session.error.message }, 500)

  const updated = await admin.from('players').update({ state: 'offline', paired_at: new Date().toISOString(), agent_version: body.agent_version ?? 'browser/1.0', pairing_code: null, pairing_expires_at: null, last_error: null }).eq('id', found.data.id).select('id,display_name,device_code,state,paired_at').single()
  if (updated.error) return json({ error: updated.error.message }, 500)
  return json({ player: updated.data, browser_session_token: token, browser_session_expires_at: session.data.expires_at, heartbeat: '/functions/v1/player-browser-heartbeat', runtime: '/functions/v1/player-browser-runtime' })
})

