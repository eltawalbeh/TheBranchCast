import { useCallback, useEffect, useState } from "react"
import { Plus, Shield } from "lucide-react"
import { supabase } from "@/lib/supabase"
import { useAuth } from "@/providers/AuthProvider"
import { useWorkspace } from "@/providers/WorkspaceProvider"
import { useWorkspaceRealtime } from "@/hooks/useWorkspaceRealtime"

type Member = { user_id: string role: string location_id: string | null }
type Role = "marketing" | "operations" | "branch" | "viewer"
export function TeamPage() {
  const { workspace } = useWorkspace()
  const { user } = useAuth()
  const [members, setMembers] = useState<Member[]>([])
  const [email, setEmail] = useState("")
  const [role, setRole] = useState<Role>("marketing")
  const [message, setMessage] = useState("")
  const load = useCallback(async () => {
    if (!supabase || !workspace) return
    const result = await supabase
      .from("organization_members")
      .select("user_id,role,location_id")
      .eq("organization_id", workspace.id)
    setMembers((result.data ?? []) as Member[])
    if (result.error) setMessage(result.error.message)
  }, [workspace?.id])
  useEffect(() => {
    void load()
  }, [load])
  useWorkspaceRealtime(["organization_members", "workspace_invites"], load)
  const invite = async () => {
    if (!supabase || !workspace || !user || !email.trim()) {
      setMessage("Enter an email address.")
      return
    }
    const result = await supabase
      .from("workspace_invites")
      .insert({
        organization_id: workspace.id,
        created_by: user.id,
        email: email.trim().toLowerCase(),
        role,
      })
    setMessage(result.error?.message ?? "Invite created.")
    if (!result.error) setEmail("")
  }
  const updateRole = async (userId: string, nextRole: Role) => {
    if (!supabase || !workspace || userId === user?.id) return
    const result = await supabase
      .from("organization_members")
      .update({ role: nextRole })
      .eq("organization_id", workspace.id)
      .eq("user_id", userId)
    setMessage(result.error?.message ?? "Role updated.")
    if (!result.error) await load()
  }
  return (
    <div style={page}>
      <header style={header}>
        <p style={eyebrow}>ORGANIZATION</p>
        <h1 style={title}>Team & roles</h1>
        <p style={sub}>Invite teammates and keep workspace access current.</p>
      </header>
      <section style={card}>
        <h2 style={sectionTitle}>Invite member</h2>
        <div className="invite-form" style={form}>
          <input
            style={field}
            type="email"
            required
            placeholder="person@company.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <select
            style={field}
            value={role}
            onChange={(e) => setRole(e.target.value as Role)}
          >
            <option value="marketing">Marketing</option>
            <option value="operations">Operations</option>
            <option value="branch">Branch manager</option>
            <option value="viewer">Viewer</option>
          </select>
          <button style={primary} onClick={() => void invite()}>
            <Plus size={15} /> Invite
          </button>
        </div>
        {message && <p style={sub}>{message}</p>}
      </section>
      <section style={card}>
        <h2 style={sectionTitle}>Current members</h2>
        {members.length === 0 ? (
          <p style={sub}>No members found.</p>
        ) : (
          members.map((member) => (
            <div style={row} key={member.user_id}>
              <span style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <Shield size={15} /> <code>{member.user_id.slice(0, 8)}…</code>
                {member.user_id === user?.id && <small>(you)</small>}
              </span>
              <select
                disabled={member.user_id === user?.id}
                style={roleField}
                value={member.role}
                onChange={(e) =>
                  void updateRole(member.user_id, e.target.value as Role)
                }
              >
                <option value="owner">Owner</option>
                <option value="marketing">Marketing</option>
                <option value="operations">Operations</option>
                <option value="branch">Branch manager</option>
                <option value="viewer">Viewer</option>
              </select>
            </div>
          ))
        )}
      </section>
      <style>
        {
          "@media(max-width:700px){.invite-form{grid-template-columns:1fr!important}.invite-form button{justify-content:center}}"
        }
      </style>
    </div>
  )
}
const page = { padding: "32px 40px", maxWidth: 1000, margin: "0 auto" } as const
const header = { marginBottom: 26 } as const
const eyebrow = {
  margin: 0,
  color: "var(--signal)",
  fontWeight: 600,
  fontSize: 12,
  letterSpacing: ".06em",
} as const
const title = { margin: "5px 0", fontSize: 28 } as const
const sub = { margin: 0, color: "var(--ink-secondary)", fontSize: 13 } as const
const card = {
  background: "#fff",
  border: "1px solid var(--border-color)",
  borderRadius: 14,
  padding: 20,
  marginBottom: 16,
} as const
const sectionTitle = { margin: "0 0 14px", fontSize: 17 } as const
const form = {
  display: "grid",
  gridTemplateColumns: "2fr 1fr auto",
  gap: 9,
} as const
const field = {
  padding: "10px 11px",
  border: "1px solid var(--border-color)",
  borderRadius: 8,
  font: "inherit",
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
} as const
const row = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: 12,
  padding: "12px 0",
  borderBottom: "1px solid var(--border-color)",
} as const
const roleField = { ...field, minWidth: 145 } as const
