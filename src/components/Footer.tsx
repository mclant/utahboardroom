import { Box, Link, useMediaQuery, useTheme } from "@mui/material"
// import { Link } from "@tanstack/react-router"

export default function Header() {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))

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
        <Link href="/">Home</Link>
        <Link href="/demo/tanstack-query">About Us</Link>
        <Link href="/demo/tanstack-query">Contact Us</Link>
      </Box>
      <Box sx={{ display: "flex", gap: "1rem" }}>
        <Link href="/waitlist">Join the waitlist</Link>
      </Box>
    </Box>
  )
}
