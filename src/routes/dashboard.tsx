import { Box, Button, Typography, useTheme } from "@mui/material"
import {
  createFileRoute,
  useNavigate,
  Outlet,
  useLocation,
} from "@tanstack/react-router"
import AuthGuard from "@/components/AuthGuard"
import { useUser } from "@/hooks/useUser"
import { USER_ROLE_TYPE } from "@/types/climber"

export const Route = createFileRoute("/dashboard")({
  component: RouteComponent,
})

function RouteComponent() {
  const theme = useTheme()
  const { handleSignOut, isSignOutLoading, climber } = useUser()

  return (
    <AuthGuard>
      <Box sx={{ height: "100vh", width: "100%", display: "flex" }}>
        <Box
          sx={{
            height: "100%",
            width: "250px",
            backgroundColor: theme.palette.primary.main,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            borderRight: `0.5px solid #26282d`,
          }}
        >
          <Box
            sx={{
              gap: 0.2,
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              py: 2,
              px: 1,
            }}
          >
            <Typography variant="h6" fontWeight={700} sx={{ mb: 1, px: 1 }}>
              Utah Board Room
            </Typography>
            <SidebarItem title="Account" to="/dashboard/account" />
            <SidebarItem
              title="Gym live camera"
              to="/dashboard/gym-live-camera"
            />
            {climber?.Gyms?.id && (
              <>
                <Typography
                  variant="h6"
                  color="accent1.main"
                  sx={{ my: 1, px: 1, fontWeight: 700 }}
                >
                  Gym
                </Typography>
                <SidebarItem
                  title="Gym Settings"
                  to="/dashboard/gym/gym-settings"
                />
              </>
            )}
            {climber?.user_type === USER_ROLE_TYPE.ADMIN && (
              <>
                <Typography
                  variant="h6"
                  color="accent1.main"
                  sx={{ my: 1, px: 1, fontWeight: 700 }}
                >
                  Admin
                </Typography>
                <SidebarItem title="Waitlist" to="/dashboard/admin/waitlist" />
                <SidebarItem title="Surveys" to="/dashboard/admin/surveys" />
              </>
            )}
          </Box>
          <Box
            sx={{
              gap: 0.2,
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              p: 1,
            }}
          >
            <Button
              variant="contained"
              color="secondary"
              onClick={handleSignOut}
              loading={isSignOutLoading}
            >
              Log out
            </Button>
          </Box>
        </Box>
        <Box
          sx={{
            flex: 1,
            height: "100%",
            backgroundColor: theme.palette.secondary.main,
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </AuthGuard>
  )
}

function SidebarItem({ title, to }: { title: string; to: string }) {
  const theme = useTheme()
  const navigate = useNavigate()
  const location = useLocation()
  const isActive = location.pathname === to

  return (
    <Typography
      variant="body1"
      fontWeight={600}
      sx={{
        width: "100%",
        cursor: "pointer",
        borderRadius: 2,
        textAlign: "start",
        px: 1,
        py: 0.4,
        transition: "background-color 0.3s ease",
        ...(isActive && {
          backgroundColor: theme.palette.secondary.main,
          border: `0.5px solid ${theme.palette.secondary.border}`,
        }),
        ":hover": {
          backgroundColor: theme.palette.secondary.main,
          border: `0.5px solid ${theme.palette.secondary.border}`,
          filter: "brightness(0.9)",
        },
      }}
      onClick={() => {
        if (to) {
          navigate({ to })
        }
      }}
    >
      {title}
    </Typography>
  )
}
