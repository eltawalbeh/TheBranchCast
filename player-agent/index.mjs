import { existsSync, readFileSync, writeFileSync } from 'node:fs'
import { spawn } from 'node:child_process'

const base = (process.env.BRANCHCAST_SUPABASE_URL || 'https://ushplpeghxebhdjcktbp.supabase.co').replace(/\/$/, '')
const key = process.env.PLAYER_AGENT_KEY
const pairingCode = process.env.PAIRING_CODE?.trim().toUpperCase()
const stateFile = process.env.PLAYER_STATE_FILE || './branchcast-player.json'
if (!key) throw new Error('PLAYER_AGENT_KEY is required')

const headers = { 'content-type': 'application/json', 'x-player-key': key }
let state = existsSync(stateFile) ? JSON.parse(readFileSync(stateFile, 'utf8')) : {}
const request = async (path, body) => { const response = await fetch(`${base}/functions/v1/${path}`, { method: 'POST', headers, body: JSON.stringify(body) }); const data = await response.json(); if (!response.ok) throw new Error(`${path} ${response.status}: ${JSON.stringify(data)}`); return data }

if (!state.device_code && !pairingCode) throw new Error('Set PAIRING_CODE for first activation or provide an existing device state file')
if (!state.device_code) { const paired = await fetch(`${base}/functions/v1/player-pair`, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ pairing_code: pairingCode, agent_version: '1.0.0' }) }); const data = await paired.json(); if (!paired.ok) throw new Error(`Pairing failed (${paired.status}): ${JSON.stringify(data)}`); state = { device_code: data.player.device_code, player_id: data.player.id }; writeFileSync(stateFile, JSON.stringify(state, null, 2)); console.log(`Paired ${data.player.display_name || state.player_id}`) }

let currentTrack = null
let child = null
const commandEnv = { play: process.env.PLAYER_PLAY_COMMAND, pause: process.env.PLAYER_PAUSE_COMMAND, skip: process.env.PLAYER_SKIP_COMMAND }
const execute = async (command) => { const shellCommand = commandEnv[command]; if (!shellCommand) throw new Error(`No command configured for ${command}`); if (command === 'pause' && child) { child.kill('SIGSTOP'); return } if (command === 'play' && child) { child.kill('SIGCONT'); return } if (command === 'skip' && child) child.kill('SIGTERM'); child = spawn(shellCommand, { shell: true, stdio: 'inherit' }); child.on('exit', () => { child = null }); }
const heartbeat = async () => { try { await request('player-heartbeat', { device_code: state.device_code, state: 'online', agent_version: '1.0.0', current_track: currentTrack }) } catch (error) { console.error(String(error)) } }
const poll = async () => { try { const result = await request('player-runtime', { action: 'poll', device_code: state.device_code }); if (!result.command) return; try { await execute(result.command.command); await request('player-runtime', { action: 'ack', device_code: state.device_code, command_id: result.command.id, status: 'acknowledged' }) } catch (error) { await request('player-runtime', { action: 'ack', device_code: state.device_code, command_id: result.command.id, status: 'failed', error_message: String(error) }) } } catch (error) { console.error(String(error)) } }

await heartbeat(); setInterval(heartbeat, 30000); setInterval(poll, 5000); console.log(`BranchCast Player Agent online: ${state.device_code}`)
