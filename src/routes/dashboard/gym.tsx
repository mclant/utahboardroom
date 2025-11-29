import AuthGuard from "@/components/AuthGuard"
import { createFileRoute, Outlet } from "@tanstack/react-router"
import { USER_ROLE_TYPE } from "@/types/climber"

export const Route = createFileRoute("/dashboard/gym")({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <AuthGuard gymOwnerPermission>
      <Outlet />
    </AuthGuard>
  )
}
