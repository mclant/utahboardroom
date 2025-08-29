import { Box, Link } from "@mui/material"
// import { Link } from "@tanstack/react-router"

export default function Header() {
  return (
    <Box
      id="header"
      sx={{
        position: "fixed",
        top: 12,
        left: 12,
        right: 12,
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
