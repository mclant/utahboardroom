import BasicPageLayout from "@/components/BasicPageLayout"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/dashboard/admin/gym-settings")({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <BasicPageLayout title="Gym Settings">
      <div>some things will be here</div>
    </BasicPageLayout>
  )
}
