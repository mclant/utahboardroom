import { Box, Link, Typography, useMediaQuery, useTheme } from "@mui/material"
import { Link as RouterLink } from "@tanstack/react-router"

export default function Header() {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("md"))

  return (
    <Box
      id="header"
      sx={{
        position: isMobile ? "absolute" : "fixed",
        top: isMobile ? 6 : 8,
        left: isMobile ? 6 : 8,
        right: isMobile ? 6 : 8,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 2,
        borderRadius: "8px",
        background: "rgba(255, 255, 255, 0.1)",
        backdropFilter: "blur(10px)",
        boxShadow: "0px 4px 10px 0px rgba(0, 0, 0, 0.10)",
        zIndex: 1,
      }}
    >
      <Box sx={{ display: "flex", gap: "1rem" }}>
        <RouterLink to="/">
          <Link href="/">Home</Link>
        </RouterLink>
        {!isMobile && <Link href="/#contactus">Contact Us</Link>}
      </Box>
      <Box sx={{ display: "flex", gap: "1rem" }}>
        <RouterLink to="/waitlist">
          <Link href="/waitlist">Join the waitlist</Link>
        </RouterLink>
      </Box>
    </Box>
  )
}
