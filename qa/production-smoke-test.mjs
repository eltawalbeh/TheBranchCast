const base = process.env.BRANCHCAST_SUPABASE_URL || 'https://ushplpeghxebhdjcktbp.supabase.co'
const key = process.env.PLAYER_AGENT_KEY
const device = process.env.PLAYER_DEVICE_CODE
if (!key || !device) throw new Error('Set PLAYER_AGENT_KEY and PLAYER_DEVICE_CODE before running this smoke test.')
const response = await fetch(`${base}/functions/v1/player-heartbeat`, { method: 'POST', headers: { 'content-type': 'application/json', 'x-player-key': key }, body: JSON.stringify({ device_code: device, state: 'online', agent_version: 'smoke-test' }) })
const body = await response.json()
if (!response.ok) throw new Error(`Heartbeat failed (${response.status}): ${JSON.stringify(body)}`)
console.log(JSON.stringify({ ok: true, player: body.player, acknowledged_at: body.acknowledged_at }, null, 2))
