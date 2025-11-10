import Header from "@/components/Header"
import { Box, useTheme } from "@mui/material"
import { createFileRoute, Outlet } from "@tanstack/react-router"

export const Route = createFileRoute("/surveys")({
  component: RouteComponent,
})

function RouteComponent() {
  const theme = useTheme()
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: theme.palette.primary.main,
        height: "auto",
        pt: 10,
      }}
    >
      <Header />
      <Outlet />
    </Box>
  )
}
