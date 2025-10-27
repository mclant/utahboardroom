import { Box, Typography } from "@mui/material"

export default function BasicPageLayout({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <Box
      sx={{
        height: "100vh",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        maxWidth: "1200px",
        margin: "0 auto",
        padding: 4,
        gap: 2,
        overflowY: "auto",
        // For Chrome, Edge, Safari
        "&::-webkit-scrollbar": {
          width: "6px",
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: (theme) => theme.palette.secondary.main,
          borderRadius: "6px",
        },
        "&::-webkit-scrollbar-track": {
          backgroundColor: "transparent",
        },
        // For Firefox
        scrollbarWidth: "thin",
        scrollbarColor: (theme) =>
          `${theme.palette.secondary.main} transparent`,
      }}
    >
      <Typography fontWeight={700} variant="h4">
        {title}
      </Typography>
      {children}
    </Box>
  )
}
