import AuthGuard from "@/components/AuthGuard"
import { createFileRoute, Outlet } from "@tanstack/react-router"
import { USER_ROLE_TYPE } from "@/types/climber"

export const Route = createFileRoute("/dashboard/admin")({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <AuthGuard permissions={[USER_ROLE_TYPE.ADMIN]}>
      <Outlet />
    </AuthGuard>
  )
}
