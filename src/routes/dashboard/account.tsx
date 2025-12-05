import BasicPageLayout from "@/components/BasicPageLayout"
import { Box, Button, Card, Typography, useTheme } from "@mui/material"
import { createFileRoute } from "@tanstack/react-router"
import CalendarHeatmap from "react-calendar-heatmap"
import "react-calendar-heatmap/dist/styles.css"
import { useState } from "react"
import { useUser } from "@/hooks/useUser"

export const Route = createFileRoute("/dashboard/account")({
  component: RouteComponent,
})

function RouteComponent() {
  const theme = useTheme()
  const { climber } = useUser()

  const [selectedYear, setSelectedYear] = useState<number>(2025)
  const years = [2025, 2024, 2023]

  return (
    <BasicPageLayout title={`${climber?.first_name} ${climber?.last_name}`}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 4,
          width: "100%",
          maxWidth: "800px",
          alignSelf: "center",
        }}
      >
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: 2,
          }}
        >
          <Typography variant="h5">Profile</Typography>
          <Card sx={{ alignItems: "flex-start", width: "100%" }}>
            <Typography variant="body1" fontWeight={700}>
              {climber?.first_name} {climber?.last_name}
            </Typography>
            <Typography variant="body1" sx={{ opacity: 0.7 }}>
              {climber?.email}
            </Typography>
          </Card>
          <Card sx={{ alignItems: "flex-start", width: "100%" }}>
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
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: 2,
          }}
        >
          <Typography variant="h5">Membership</Typography>
          <Card
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "row",
              gap: 2,
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: 0,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                <Typography variant="body1" fontWeight={700}>
                  Membership Status
                </Typography>
                <MembershipStatusTag
                  status={climber?.stripe_customer_id ? "Active" : "Inactive"}
                />
              </Box>
              <Typography variant="body1" sx={{ opacity: 0.7 }}>
                See invoices, change billing, and cancel
              </Typography>
            </Box>
            <Button variant="contained" color="primary">
              Manage Membership
            </Button>
          </Card>
        </Box>
      </Box>
    </BasicPageLayout>
  )
}

function MembershipStatusTag({ status }: { status: "Active" | "Inactive" }) {
  const theme = useTheme()
  return (
    <Box
      sx={{
        px: 1.5,
        py: 0.5,
        borderRadius: 2,
        border: `1px solid ${status === "Active" ? theme.palette.accent1.main : theme.palette.text.primary}`,
        opacity: status === "Active" ? 1 : 0.5,
      }}
    >
      <Typography
        variant="body1"
        fontWeight={700}
        color={
          status === "Active"
            ? theme.palette.accent1.main
            : theme.palette.text.primary
        }
      >
        {status}
      </Typography>
    </Box>
  )
}
