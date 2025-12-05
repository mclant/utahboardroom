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

export const Route = createFileRoute("/onboarding")({
  component: RouteComponent,
})

function RouteComponent() {
  const theme = useTheme()
  // const { handleSignOut, isSignOutLoading, climber } = useUser()

  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        backgroundColor: theme.palette.secondary.main,
        display: "flex",
        justifyContent: "center",
        position: "relative",
      }}
    >
      <Outlet />
    </Box>
  )
}
