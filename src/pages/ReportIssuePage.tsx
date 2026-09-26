import { useState } from "react"
import { Send } from "lucide-react"
import { supabase } from "@/lib/supabase"
import { useAuth } from "@/providers/AuthProvider"
import { useWorkspace } from "@/providers/WorkspaceProvider"
export function ReportIssuePage() {
  const { workspace } = useWorkspace()
  const { user } = useAuth()
  const [type, setType] = useState("No audio")
  const [note, setNote] = useState("")
  const [sent, setSent] = useState(false)
  const [error, setError] = useState("")
  const [busy, setBusy] = useState(false)
  const submit = async () => {
    if (!supabase || !workspace || !user) return
    setBusy(true)
    setError("")
    let query = supabase
      .from("locations")
      .select("id")
      .eq("organization_id", workspace.id)
    if (workspace.locationId) query = query.eq("id", workspace.locationId)
    const location = await query.limit(1).maybeSingle()
    if (location.error || !location.data) {
      setError(location.error?.message ?? "No assigned location was found.")
      setBusy(false)
      return
    }
    const result = await supabase
      .from("branch_issue_reports")
      .insert({
        organization_id: workspace.id,
        location_id: location.data.id,
        created_by: user.id,
        issue_type: type,
        note: note.trim() || null,
      })
    if (result.error) setError(result.error.message)
    else {
      setSent(true)
      setNote("")
    }
    setBusy(false)
  }
  return (
    <div style={page}>
      <p style={eyebrow}>BRANCH SUPPORT</p>
      <h1 style={title}>Report an issue</h1>
      <p style={sub}>
        Tell Operations what needs attention at your assigned location.
      </p>
      {sent ? (
        <section style={card}>
          <h2>Issue submitted</h2>
          <p style={sub}>Your report was sent to the operations team.</p>
        </section>
      ) : (
        <section style={card}>
          <label style={label}>
            Issue type
            <select
              style={field}
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option>No audio</option>
              <option>Wrong content</option>
              <option>Player offline</option>
              <option>Other</option>
            </select>
          </label>
          <label style={label}>
            Details
            <textarea
              style={{ ...field, minHeight: 110 }}
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Describe what you see or hear…"
            />
          </label>
          {error && (
            <p style={{ color: "var(--danger)", fontSize: 13 }}>{error}</p>
          )}
          <button disabled={busy} style={primary} onClick={() => void submit()}>
            <Send size={15} /> {busy ? "Sending…" : "Submit report"}
          </button>
        </section>
      )}
    </div>
  )
}
const page = { padding: "32px 40px", maxWidth: 760, margin: "0 auto" } as const
const eyebrow = {
  margin: 0,
  color: "var(--signal)",
  fontWeight: 600,
  fontSize: 12,
  letterSpacing: ".06em",
} as const
const title = { margin: "5px 0", fontSize: 28 } as const
const sub = { margin: 0, color: "var(--ink-secondary)" } as const
const card = {
  background: "#fff",
  border: "1px solid var(--border-color)",
  borderRadius: 14,
  padding: 24,
  marginTop: 24,
} as const
const label = {
  display: "block",
  fontSize: 13,
  fontWeight: 600,
  marginTop: 14,
} as const
const field = {
  width: "100%",
  marginTop: 7,
  padding: "10px 11px",
  border: "1px solid var(--border-color)",
  borderRadius: 8,
  font: "inherit",
  minHeight: 44,
} as const
const primary = {
  display: "inline-flex",
  alignItems: "center",
  gap: 7,
  border: 0,
  borderRadius: 8,
  padding: "10px 14px",
  background: "var(--signal)",
  color: "#fff",
  fontWeight: 600,
  cursor: "pointer",
  marginTop: 20,
} as const
