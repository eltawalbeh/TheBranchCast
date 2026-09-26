import { useCallback, useEffect, useState } from "react"
import { Outlet } from "react-router-dom"
import { Sidebar, type DemoRole } from "./Sidebar"
import { TopBar } from "./TopBar"
import { useWorkspace } from "@/providers/WorkspaceProvider"
import { supabase } from "@/lib/supabase"
import { useWorkspaceRealtime } from "@/hooks/useWorkspaceRealtime"

export function AppShell() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [alertCount, setAlertCount] = useState(0)
  const { workspace } = useWorkspace()
  const role = (workspace?.role ?? "viewer") as DemoRole
  const loadAlerts = useCallback(async () => {
    if (!supabase || !workspace) return
    const result = await supabase
      .from("alerts")
      .select("id", { count: "exact", head: true })
      .neq("state", "resolved")
    setAlertCount(result.count ?? 0)
  }, [workspace?.id])
  useEffect(() => {
    void loadAlerts()
  }, [loadAlerts])
  useWorkspaceRealtime(["alerts"], loadAlerts)
  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        background: "var(--canvas)",
      }}
    >
      <Sidebar
        role={role}
        onRoleChange={() => undefined}
        mobileOpen={mobileOpen}
        onMobileClose={() => setMobileOpen(false)}
        organizationName={workspace?.name}
      />
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          minWidth: 0,
          overflowX: "hidden",
        }}
      >
        <TopBar
          role={role}
          onMenuOpen={() => setMobileOpen(true)}
          alertCount={alertCount}
        />
        <main style={{ flex: 1 }}>
          <Outlet context={{ role }} />
        </main>
      </div>
    </div>
  )
}
