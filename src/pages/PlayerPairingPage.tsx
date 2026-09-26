import { useCallback, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import {
  CheckCircle2,
  Copy,
  KeyRound,
  RefreshCw,
  ShieldCheck,
} from "lucide-react"
import { supabase } from "@/lib/supabase"
import { useWorkspace } from "@/providers/WorkspaceProvider"

type Player = {
  id: string
  display_name: string | null
  device_code: string
  state: string
  pairing_code: string | null
  pairing_expires_at: string | null
  paired_at: string | null
}
const db = supabase as any

export function PlayerPairingPage() {
  const { workspace } = useWorkspace()
  const [players, setPlayers] = useState<Player[]>([])
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState("")
  const load = useCallback(async () => {
    if (!db || !workspace) return
    setLoading(true)
    const result = await db
      .from("players")
      .select(
        "id,display_name,device_code,state,pairing_code,pairing_expires_at,paired_at",
      )
      .order("display_name")
    setPlayers((result.data ?? []) as Player[])
    setLoading(false)
  }, [workspace?.id])
  useEffect(() => {
    void load()
  }, [load])
  const regenerate = async (id: string) => {
    const code = crypto
      .randomUUID()
      .replaceAll("-", "")
      .slice(0, 6)
      .toUpperCase()
    const result = await db
      .from("players")
      .update({
        pairing_code: code,
        pairing_expires_at: new Date(Date.now() + 15 * 60 * 1000).toISOString(),
        state: "unpaired",
        paired_at: null,
      })
      .eq("id", id)
    setMessage(result.error?.message ?? "New pairing code generated.")
    if (!result.error) await load()
  }
  const copy = async (code: string) => {
    await navigator.clipboard?.writeText(code)
    setMessage("Pairing code copied.")
  }
  return (
    <div style={page}>
      <header style={header}>
        <div>
          <p style={eyebrow}>DEVICE ACTIVATION</p>
          <h1 style={title}>Pair a player</h1>
          <p style={sub}>
            Use a temporary code to activate a BranchCast player for its
            assigned zone.
          </p>
        </div>
        <button style={button} onClick={() => void load()}>
          <RefreshCw size={15} /> Refresh
        </button>
      </header>
      {message && (
        <p style={{ color: "var(--signal)", fontSize: 13 }}>{message}</p>
      )}
      <section style={notice}>
        <ShieldCheck size={20} />
        <div>
          <strong>How pairing works</strong>
          <p>
            Open <Link to="/player" style={{ color: "var(--signal)", fontWeight: 700 }}>Player Mode</Link> on the desktop or mobile browser that should play the audio, enter the active code below, then keep that tab open. The code expires after 15 minutes and can be regenerated.
          </p>
        </div>
      </section>
      {loading ? (
        <p style={sub}>Loading players…</p>
      ) : (
        <section style={card}>
          {players.length === 0 ? (
            <p style={sub}>No players registered yet. Add a location first.</p>
          ) : (
            players.map((player) => (
              <article style={row} key={player.id}>
                <div>
                  <strong>{player.display_name || "Unnamed player"}</strong>
                  <small>
                    Device {player.device_code} · {player.state}
                  </small>
                </div>
                {player.pairing_code ? (
                  <div style={codeBox}>
                    <span>PAIRING CODE</span>
                    <strong>{player.pairing_code}</strong>
                    <small>
                      Expires{" "}
                      {player.pairing_expires_at
                        ? new Date(
                            player.pairing_expires_at,
                          ).toLocaleTimeString()
                        : "soon"}
                    </small>
                    <button
                      style={copyButton}
                      onClick={() => void copy(player.pairing_code!)}
                    >
                      <Copy size={14} /> Copy
                    </button>
                  </div>
                ) : (
                  <div style={paired}>
                    <CheckCircle2 size={16} /> Paired
                    {player.paired_at
                      ? ` · ${new Date(player.paired_at).toLocaleString()}`
                      : ""}
                  </div>
                )}
                <button
                  style={secondary}
                  onClick={() => void regenerate(player.id)}
                >
                  <KeyRound size={14} />{" "}
                  {player.pairing_code ? "Regenerate" : "Pair again"}
                </button>
              </article>
            ))
          )}
        </section>
      )}
    </div>
  )
}
const page = { padding: "32px 40px", maxWidth: 1100, margin: "0 auto" } as const
const header = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start",
  gap: 16,
  flexWrap: "wrap",
  marginBottom: 24,
} as const
const eyebrow = {
  margin: 0,
  color: "var(--signal)",
  fontWeight: 600,
  fontSize: 12,
  letterSpacing: ".06em",
} as const
const title = { margin: "5px 0", fontSize: 28, color: "var(--ink)" } as const
const sub = { margin: 0, color: "var(--ink-secondary)", fontSize: 13 } as const
const button = {
  display: "inline-flex",
  alignItems: "center",
  gap: 7,
  border: "1px solid var(--border-color)",
  borderRadius: 8,
  padding: "10px 13px",
  background: "#fff",
  cursor: "pointer",
} as const
const notice = {
  display: "flex",
  gap: 13,
  padding: 18,
  borderRadius: 12,
  background: "var(--surface-subtle)",
  color: "var(--ink-secondary)",
  marginBottom: 18,
} as const
const card = {
  background: "#fff",
  border: "1px solid var(--border-color)",
  borderRadius: 14,
  padding: "4px 20px",
} as const
const row = {
  display: "grid",
  gridTemplateColumns: "1.2fr 1fr auto",
  alignItems: "center",
  gap: 16,
  padding: "18px 0",
  borderBottom: "1px solid var(--border-color)",
} as const
const codeBox = { display: "grid", gap: 3 } as const
const codeBoxSpan = {}
const codeBoxStrong = {}
const copyButton = {
  display: "inline-flex",
  alignItems: "center",
  gap: 5,
  border: 0,
  background: "transparent",
  color: "var(--signal)",
  cursor: "pointer",
  padding: 0,
  fontSize: 12,
} as const
const secondary = {
  display: "inline-flex",
  alignItems: "center",
  gap: 6,
  border: "1px solid var(--border-color)",
  borderRadius: 8,
  padding: "9px 11px",
  background: "#fff",
  cursor: "pointer",
} as const
const paired = {
  display: "inline-flex",
  alignItems: "center",
  gap: 6,
  color: "var(--success)",
  fontSize: 13,
} as const

