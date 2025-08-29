import { Box, Link, Typography, useMediaQuery, useTheme } from "@mui/material"

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
      {isMobile ? (
        <>
          <Typography variant="body1" color={theme.palette.accent2.main}>
            UBR
          </Typography>
          <Box sx={{ display: "flex", gap: "1rem" }}>
            <Link href="/waitlist">Join the waitlist</Link>
          </Box>
        </>
      ) : (
        <>
          <Box sx={{ display: "flex", gap: "1rem" }}>
            <Link href="/">Home</Link>
            <Link href="/">About Us</Link>
            <Link href="/">Contact Us</Link>
          </Box>
          <Box sx={{ display: "flex", gap: "1rem" }}>
            <Link href="/waitlist">Join the waitlist</Link>
          </Box>
        </>
      )}
    </Box>
  )
}
