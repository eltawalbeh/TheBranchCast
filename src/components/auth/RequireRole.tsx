import { Navigate, Outlet, useLocation } from "react-router-dom"
import { useWorkspace } from "@/providers/WorkspaceProvider"

export function RequireRole({ roles }: { roles: string[] }) {
  const { workspace, isLoading } = useWorkspace()
  const location = useLocation()
  if (isLoading)
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "grid",
          placeItems: "center",
          color: "var(--ink-secondary)",
        }}
      >
        Checking permissions…
      </div>
    )
  if (!workspace)
    return (
      <Navigate to="/onboarding" replace state={{ from: location.pathname }} />
    )
  return roles.includes(workspace.role) ? (
    <Outlet />
  ) : (
    <Navigate to="/access-denied" replace state={{ from: location.pathname }} />
  )
}
