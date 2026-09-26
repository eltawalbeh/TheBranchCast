import { createClient } from 'npm:@supabase/supabase-js@2'

const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'content-type, apikey, authorization, x-client-info',
  'Content-Type': 'application/json',
}
const ok = (data: Record<string, unknown>) => new Response(JSON.stringify({ ok: true, ...data }), { status: 200, headers })
const fail = (error: string) => new Response(JSON.stringify({ ok: false, error }), { status: 200, headers })

Deno.serve(async (request) => {
  if (request.method === 'OPTIONS') return new Response('ok', { status: 200, headers })
  if (request.method !== 'POST') return fail('Method not allowed')
  const authorization = request.headers.get('Authorization')
  if (!authorization) return fail('Manager authorization is required')
  const body = await request.json().catch(() => ({})) as { player_id?: string; action?: 'stop' | 'regenerate' }
  if (!body.player_id || !body.action) return fail('player_id and action are required')
  const url = Deno.env.get('SUPABASE_URL')
  const serviceRole = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')
  if (!url || !serviceRole) return fail('Function configuration is incomplete')
  const admin = createClient(url, serviceRole)
  const token = authorization.replace(/^Bearer\s+/i, '')
  const identity = await admin.auth.getUser(token)
  if (identity.error || !identity.data.user) return fail('Manager session is invalid')
  const player = await admin.from('players').select('id,zone_id').eq('id', body.player_id).maybeSingle()
  if (player.error) return fail(player.error.message)
  if (!player.data) return fail('Player not found')
  const zone = await admin.from('audio_zones').select('location_id').eq('id', player.data.zone_id).single()
  if (zone.error || !zone.data) return fail(zone.error?.message || 'Player zone not found')
  const location = await admin.from('locations').select('organization_id').eq('id', zone.data.location_id).single()
  if (location.error || !location.data) return fail(location.error?.message || 'Player location not found')
  const member = await admin.from('organization_members').select('id').eq('organization_id', location.data.organization_id).eq('user_id', identity.data.user.id).maybeSingle()
  if (member.error) return fail(member.error.message)
  if (!member.data) return fail('You do not have access to this player')
  const code = crypto.randomUUID().replaceAll('-', '').slice(0, 6).toUpperCase()
  const expiry = new Date(Date.now() + 15 * 60 * 1000).toISOString()
  if (body.action === 'stop') {
    const command = await admin.from('player_commands').insert({ player_id: body.player_id, requested_by: identity.data.user.id, command: 'pause', payload: { source: 'manager-stop' }, status: 'pending' })
    if (command.error) return fail(command.error.message)
  }
  const update = body.action === 'stop' ? { pairing_code: code, pairing_expires_at: expiry, last_error: null } : { pairing_code: code, pairing_expires_at: expiry, paired_at: null, last_error: null }
  const updated = await admin.from('players').update(update).eq('id', body.player_id).select('id,display_name,device_code,state,pairing_code,pairing_expires_at').single()
  if (updated.error) return fail(updated.error.message)
  return ok({ action: body.action, player: updated.data, message: body.action === 'stop' ? 'Playback stopped, a new pairing code was generated, and the browser remains online.' : 'A new pairing code was generated.' })
})