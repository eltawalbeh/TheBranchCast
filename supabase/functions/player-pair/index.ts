import { createClient } from 'npm:@supabase/supabase-js@2'

const headers = { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': 'content-type', 'Content-Type': 'application/json' }

Deno.serve(async (request) => {
  if (request.method === 'OPTIONS') return new Response('ok', { headers })
  if (request.method !== 'POST') return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405, headers })
  let body: { pairing_code?: string; agent_version?: string }
  try { body = await request.json() } catch { return new Response(JSON.stringify({ error: 'Invalid JSON' }), { status: 400, headers }) }
  const pairingCode = body.pairing_code?.trim().toUpperCase()
  if (!pairingCode) return new Response(JSON.stringify({ error: 'pairing_code is required' }), { status: 422, headers })
  const admin = createClient(Deno.env.get('SUPABASE_URL')!, Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!)
  const found = await admin.from('players').select('id,display_name,device_code,pairing_expires_at').eq('pairing_code', pairingCode).maybeSingle()
  if (found.error) return new Response(JSON.stringify({ error: found.error.message }), { status: 500, headers })
  if (!found.data || !found.data.pairing_expires_at || new Date(found.data.pairing_expires_at).getTime() < Date.now()) return new Response(JSON.stringify({ error: 'Pairing code is invalid or expired' }), { status: 410, headers })
  const updated = await admin.from('players').update({ state: 'offline', paired_at: new Date().toISOString(), agent_version: body.agent_version ?? null, pairing_code: null, pairing_expires_at: null, last_error: null }).eq('id', found.data.id).select('id,display_name,device_code,state,paired_at').single()
  if (updated.error) return new Response(JSON.stringify({ error: updated.error.message }), { status: 500, headers })
  return new Response(JSON.stringify({ player: updated.data, heartbeat: '/functions/v1/player-heartbeat', runtime: '/functions/v1/player-runtime' }), { status: 200, headers })
})
