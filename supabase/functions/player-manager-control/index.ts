import { createClient } from 'npm:@supabase/supabase-js@2'

const headers = { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'POST, OPTIONS', 'Access-Control-Allow-Headers': 'content-type, apikey, authorization, x-client-info', 'Content-Type': 'application/json' }
const json = (body: unknown, status = 200) => new Response(JSON.stringify(body), { status, headers })

Deno.serve(async (request) => {
  if (request.method === 'OPTIONS') return new Response('ok', { headers })
  if (request.method !== 'POST') return json({ error: 'Method not allowed' }, 405)
  const authorization = request.headers.get('Authorization')
  if (!authorization) return json({ error: 'Manager authorization is required' }, 401)
  const body = await request.json().catch(() => ({})) as { player_id?: string; action?: 'stop' | 'regenerate' }
  if (!body.player_id || !body.action) return json({ error: 'player_id and action are required' }, 422)

  const url = Deno.env.get('SUPABASE_URL')!
  const anon = createClient(url, Deno.env.get('SUPABASE_ANON_KEY')!, { global: { headers: { Authorization: authorization } } })
  const identity = await anon.auth.getUser()
  if (identity.error || !identity.data.user) return json({ error: 'Manager session is invalid' }, 401)
  const admin = createClient(url, Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!)
  const player = await admin.from('players').select('id,zone_id').eq('id', body.player_id).maybeSingle()
  if (player.error || !player.data) return json({ error: 'Player not found' }, 404)
  const zone = await admin.from('audio_zones').select('location_id').eq('id', player.data.zone_id).single()
  const location = zone.data ? await admin.from('locations').select('organization_id').eq('id', zone.data.location_id).single() : null
  const member = location?.data ? await admin.from('organization_members').select('id').eq('organization_id', location.data.organization_id).eq('user_id', identity.data.user.id).maybeSingle() : null
  if (member?.error || !member?.data) return json({ error: 'You do not have access to this player' }, 403)

  const code = crypto.randomUUID().replaceAll('-', '').slice(0, 6).toUpperCase()
  const expiry = new Date(Date.now() + 15 * 60 * 1000).toISOString()
  if (body.action === 'stop') {
    const command = await admin.from('player_commands').insert({ player_id: body.player_id, requested_by: identity.data.user.id, command: 'pause', payload: { source: 'manager-stop' }, status: 'pending' })
    if (command.error) return json({ error: command.error.message }, 500)
  }
  const updated = await admin.from('players').update({ pairing_code: code, pairing_expires_at: expiry, paired_at: body.action === 'stop' ? undefined : null, last_error: null }).eq('id', body.player_id).select('id,display_name,device_code,state,pairing_code,pairing_expires_at').single()
  if (updated.error) return json({ error: updated.error.message }, 500)
  return json({ action: body.action, player: updated.data, message: body.action === 'stop' ? 'Playback stopped, a new pairing code was generated, and the browser remains online.' : 'A new pairing code was generated.' })
})
