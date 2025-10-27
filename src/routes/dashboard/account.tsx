import BasicPageLayout from "@/components/BasicPageLayout"
import { useGetAuthUser, useGetClimber } from "@/db"
import { Box, Typography } from "@mui/material"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/dashboard/account")({
  component: RouteComponent,
})

function RouteComponent() {
  const { data: authUserData, isLoading: isLoadingAuthUser } = useGetAuthUser()
  const authUser = authUserData?.data?.user
  const { data: climberData, isLoading: isLoadingClimber } = useGetClimber({
    userId: authUser?.id || "",
  })
  // @ts-ignore
  const climber = climberData?.data?.[0]
  return (
    <BasicPageLayout title="Account">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
        }}
      >
        <Typography variant="body1" fontWeight={700}>
          {climber?.first_name} {climber?.last_name}
        </Typography>
        <Typography variant="body1" sx={{ opacity: 0.7 }}>
          {climber?.email}
        </Typography>
      </Box>
      <Typography variant="body1" fontWeight={700}>
        Membership
      </Typography>
    </BasicPageLayout>
  )
}
