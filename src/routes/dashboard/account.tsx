import BasicPageLayout from "@/components/BasicPageLayout"
import { useGetAuthUser, useGetClimber } from "@/db"
import { Box, Card, Chip, Typography, useTheme } from "@mui/material"
import { createFileRoute } from "@tanstack/react-router"
import CalendarHeatmap from "react-calendar-heatmap"
import "react-calendar-heatmap/dist/styles.css"
import { useState } from "react"

export const Route = createFileRoute("/dashboard/account")({
  component: RouteComponent,
})

function RouteComponent() {
  const theme = useTheme()
  const { data: authUserData } = useGetAuthUser()
  const authUser = authUserData?.data?.user
  const { data: climberData } = useGetClimber({
    userId: authUser?.id || "",
  })
  // @ts-ignore
  const climber = climberData?.data?.[0]

  const [selectedYear, setSelectedYear] = useState<number>(2025)
  const years = [2025, 2024, 2023]

  return (
    <BasicPageLayout title={`${climber?.first_name} ${climber?.last_name}`}>
      <Box sx={{ display: "flex", gap: 2, width: "100%" }}>
        <Box
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: 2,
          }}
        >
          <Card sx={{ alignItems: "flex-start", width: "100%" }}>
            <Typography variant="body1" fontWeight={700}>
              {climber?.first_name} {climber?.last_name}
            </Typography>
            <Typography variant="body1" sx={{ opacity: 0.7 }}>
              {climber?.email}
            </Typography>
          </Card>
          <Card sx={{ alignItems: "flex-start", width: "100%" }}>
            <Typography variant="body1" fontWeight={700}>
              Membership Status
            </Typography>
            <MembershipStatusTag status={"Active"} />
          </Card>
        </Box>
        <Box sx={{ flex: 3 }}>
          <Card>
            <Typography>Gym Activity</Typography>
            <Box
              sx={{
                width: "100%",
                display: "flex",
                alignItems: "flex-start",
                gap: 4,
              }}
            >
              <CalendarHeatmap
                startDate={new Date("2024-01-01")}
                endDate={new Date("2024-12-31")}
                values={[
                  { date: "2024-01-01", count: 3 },
                  { date: "2024-01-02", count: 7 },
                  // ... more data
                ]}
                classForValue={(value: any) => {
                  if (!value) return "color-empty"
                  return `color-scale-${Math.min(value.count, 4)}`
                }}
                showMonthLabels={true}
              />
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                }}
              >
                {years.map((year) => (
                  <Typography
                    variant="body2"
                    onClick={() => setSelectedYear(year)}
                    sx={{
                      opacity: year === selectedYear ? 1 : 0.7,
                      backgroundColor:
                        year === selectedYear
                          ? theme.palette.accent1.main
                          : "none",
                      px: 1.5,
                      py: 0.5,
                      borderRadius: 1,
                      cursor: "pointer",
                      transition: "all 0.2s ease",
                    }}
                  >
                    {year}
                  </Typography>
                ))}
              </Box>
            </Box>
          </Card>
        </Box>
      </Box>
    </BasicPageLayout>
  )
}

function MembershipStatusTag({ status }: { status: string }) {
  return (
    <Chip label={status} color={status === "Active" ? "success" : "error"} />
  )
}
