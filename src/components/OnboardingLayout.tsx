import { Box, Typography, useTheme } from "@mui/material"

export default function OnboardingLayout({
  children,
  progress,
}: {
  children: React.ReactNode
  progress: number
}) {
  const theme = useTheme()
  return (
    <Box
      sx={{
        maxWidth: "500px",
        width: "100%",
        height: "calc(100vh - 50px)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          width: "100%",
          height: "50px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          // Base border (optional - shows the "track")
          borderBottom: `2px solid ${theme.palette.secondary.main}`,
          // Progress indicator pseudo-element
          "&::after": {
            content: '""',
            position: "absolute",
            bottom: -2, // Offset to overlay the base border
            left: 0,
            width: `${progress}%`, // Control this with your step progress
            height: "2px",
            backgroundColor: theme.palette.accent1.main,
            transition: "width 0.3s ease", // Smooth animation between steps
          },
          transition: "all 0.3s ease",
        }}
      >
        <Typography variant="h6" fontWeight={700}>
          Utah Board Room
        </Typography>
      </Box>
      {children}
    </Box>
  )
}
