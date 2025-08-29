import { Box, Link, useTheme } from "@mui/material"
import { Link as RouterLink } from "@tanstack/react-router"

export default function Header() {
  const theme = useTheme()
  // const isMobile = useMediaQuery(theme.breakpoints.down("sm"))

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        gap: 4,
        paddingX: 2,
        paddingY: 6,
        backgroundColor: theme.palette.primary.main,
      }}
    >
      <Box sx={{ display: "flex", gap: "1rem", flexDirection: "column" }}>
        <RouterLink to="/waitlist">
          <Link>Home</Link>
        </RouterLink>
        <RouterLink to="/waitlist">
          <Link>About Us</Link>
        </RouterLink>
        <RouterLink to="/waitlist">
          <Link>Contact Us</Link>
        </RouterLink>
      </Box>
      <Box sx={{ display: "flex", gap: "1rem" }}>
        <RouterLink to="/waitlist">
          <Link>Join the waitlist</Link>
        </RouterLink>
      </Box>
    </Box>
  )
}
