import { useCallback, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { CheckCircle2, Copy, KeyRound, RefreshCw, ShieldCheck } from "lucide-react"
import { supabase } from "@/lib/supabase"
import { useWorkspace } from "@/providers/WorkspaceProvider"

type Player = { id: string; display_name: string | null; device_code: string; state: string; pairing_code: string | null; pairing_expires_at: string | null; paired_at: string | null }

function isActiveCode(player: Player) {
  if (!player.pairing_code || !player.pairing_expires_at) return false
  return new Date(player.pairing_expires_at).getTime() > Date.now()
}

export function PlayerPairingPage() {
  const { workspace } = useWorkspace()
  const [players, setPlayers] = useState<Player[]>([])
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState("")

  const load = useCallback(async () => {
    if (!workspace) return
    setLoading(true)
    const result = await supabase.from("players").select("id,display_name,device_code,state,pairing_code,pairing_expires_at,paired_at").order("display_name")
    setPlayers((result.data || []) as Player[])
    setLoading(false)
  }, [workspace?.id])

  useEffect(() => { void load() }, [load])

  const generate = async (playerId: string) => {
    setMessage("")
    const result = await supabase.functions.invoke("player-manager-control", { body: { player_id: playerId, action: "regenerate" } })
    if (result.error || result.data?.ok === false) { setMessage(result.error?.message || result.data?.error || "Could not generate a pairing code."); return }
    setMessage("New pairing code generated.")
    await load()
  }

  const copy = async (code: string) => { await navigator.clipboard?.writeText(code); setMessage("Pairing code copied.") }

  return (
    <main style={page}>
      <header style={header}>
        <div><p style={eyebrow}>DEVICE ACTIVATION</p><h1 style={title}>Pair a player</h1><p style={sub}>Enter the active code on the desktop or mobile browser that should play audio.</p></div>
        <button type="button" style={button} onClick={() => void load()}><RefreshCw size={15} /> Refresh</button>
      </header>
      {message ? <p style={messageStyle}>{message}</p> : null}
      <section style={notice}><ShieldCheck size={20} /><p style={sub}>Open <Link to="/player" style={link}>Player Mode</Link>, enter an active code, and keep that browser tab open. Codes expire after 15 minutes.</p></section>
      {loading ? <p style={sub}>Loading players...</p> : null}
      {!loading && players.length === 0 ? <p style={sub}>No players registered yet. Add a location first.</p> : null}
      {!loading && players.length > 0 ? <section style={card}>{players.map((player) => {
        const active = isActiveCode(player)
        return <article style={row} key={player.id}>
          <div><strong>{player.display_name || "Unnamed player"}</strong><small>Device {player.device_code} · {player.state}</small></div>
          {active ? <div style={codeBox}><span style={codeLabel}>PAIRING CODE</span><strong style={codeValue}>{player.pairing_code}</strong><small>Expires {new Date(player.pairing_expires_at as string).toLocaleTimeString()}</small><button type="button" style={copyButton} onClick={() => void copy(player.pairing_code as string)}><Copy size={14} /> Copy</button></div> : <div style={paired}><CheckCircle2 size={16} /> {player.pairing_code ? "Code expired" : "Paired"}</div>}
          <button type="button" style={secondary} onClick={() => void generate(player.id)}><KeyRound size={14} /> {active ? "Regenerate" : "Generate code"}</button>
        </article>
      })}</section> : null}
    </main>
  )
}

const page = { padding: "32px 40px", maxWidth: 1100, margin: "0 auto" }
const header = { display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 16, flexWrap: "wrap", marginBottom: 24 }
const eyebrow = { margin: 0, color: "var(--signal)", fontWeight: 600, fontSize: 12, letterSpacing: ".06em" }
const title = { margin: "5px 0", fontSize: 28, color: "var(--ink)" }
const sub = { margin: 0, color: "var(--ink-secondary)", fontSize: 13 }
const link = { color: "var(--signal)", fontWeight: 700 }
const button = { display: "inline-flex", alignItems: "center", gap: 7, border: "1px solid var(--border-color)", borderRadius: 8, padding: "10px 13px", background: "#fff", cursor: "pointer" }
const messageStyle = { color: "var(--signal)", fontSize: 13 }
const notice = { display: "flex", gap: 13, padding: 18, borderRadius: 12, background: "var(--surface-subtle)", color: "var(--ink-secondary)", marginBottom: 18 }
const card = { background: "#fff", border: "1px solid var(--border-color)", borderRadius: 14, padding: "4px 20px" }
const row = { display: "grid", gridTemplateColumns: "1.2fr 1fr auto", alignItems: "center", gap: 16, padding: "18px 0", borderBottom: "1px solid var(--border-color)" }
const codeBox = { display: "grid", gap: 3 }
const codeLabel = { fontSize: 11, color: "var(--ink-tertiary)" }
const codeValue = { fontSize: 22, letterSpacing: 2 }
const copyButton = { display: "inline-flex", alignItems: "center", gap: 5, border: 0, background: "transparent", color: "var(--signal)", cursor: "pointer", padding: 0, fontSize: 12 }
const secondary = { display: "inline-flex", alignItems: "center", gap: 6, border: "1px solid var(--border-color)", borderRadius: 8, padding: "9px 11px", background: "#fff", cursor: "pointer" }
const paired = { display: "inline-flex", alignItems: "center", gap: 6, color: "var(--success)", fontSize: 13 }