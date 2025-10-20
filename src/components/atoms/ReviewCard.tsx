import { theme } from "@/theme"
import { Box, Typography } from "@mui/material"

export default function ReviewCard({
  text,
  name,
  date,
}: {
  text: string
  name: string
  date: string
}) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "start",
        alignItems: "start",
        gap: 2,
        backgroundColor: theme.palette.secondary.main,
        padding: 2,
        borderRadius: 2,
        border: `1px solid ${theme.palette.text.disabled}`,
        width: 320,
        minHeight: 142,
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
          width: "100%",
        }}
      >
        <Typography variant="body2">{name}</Typography>
        <Typography variant="body2">{date}</Typography>
      </Box>
      <Typography
        variant="body1"
        fontWeight={600}
        sx={{
          textAlign: "left",
          overflow: "hidden",
          textOverflow: "ellipsis",
          display: "-webkit-box",
          WebkitLineClamp: 3,
          WebkitBoxOrient: "vertical",
          wordBreak: "break-word",
        }}
      >
        {text}
      </Typography>
    </Box>
  )
}
