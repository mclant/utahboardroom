import BasicPageLayout from "@/components/BasicPageLayout"
import { useGetGym } from "@/db"
import { useUser } from "@/hooks/useUser"
import { Card, Typography } from "@mui/material"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/dashboard/gym/gym-settings")({
  component: RouteComponent,
})

function RouteComponent() {
  const { climber } = useUser()
  const { data: gymData } = useGetGym({ gymId: climber?.Gyms?.id || "" })
  // @ts-ignore
  const gym = gymData?.data?.[0]
  return (
    <BasicPageLayout title={gym?.name}>
      <Card sx={{ alignItems: "flex-start" }}>
        <Typography variant="h6" fontWeight={700}>
          {gym?.name}
        </Typography>
        <Typography sx={{ opacity: 0.7 }}>{gym?.address}</Typography>
      </Card>
      <Card sx={{ alignItems: "flex-start" }}>
        <Typography variant="h6" fontWeight={700}>
          Enrollment Status
        </Typography>
        <Typography sx={{ opacity: 0.7 }}>
          {gym?.is_enrollment_open ? "Open" : "Closed"}
        </Typography>
      </Card>
      <Card sx={{ alignItems: "flex-start" }}>
        <Typography variant="h6" fontWeight={700}>
          Total Members
        </Typography>
        <Typography sx={{ opacity: 0.7 }}>260</Typography>
      </Card>
    </BasicPageLayout>
  )
}
