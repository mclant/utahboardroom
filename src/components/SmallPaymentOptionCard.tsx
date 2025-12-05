import { Box, Typography, useTheme } from "@mui/material"
import { HiCheckCircle } from "react-icons/hi"
import { MdOutlineCircle } from "react-icons/md"
import type { PaymentFrequencyOption } from "./homepage/PaymentInfoSection"

export function SmallPaymentOptionCard({
  value,
  isSelected,
  onClick,
}: {
  value: PaymentFrequencyOption
  isSelected: boolean
  onClick: () => void
}) {
  const theme = useTheme()

  return (
    <Box
      onClick={onClick}
      sx={{
        backgroundColor: theme.palette.secondary.border,
        border: `1px solid ${isSelected ? theme.palette.accent1.main : theme.palette.secondary.border}`,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 2,
        borderRadius: "12px",
        gap: 4,
        width: "100%",
        maxWidth: "412px",
        minHeight: "72px",
        cursor: "pointer",
        transition: "all 0.3s ease",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          height: "100%",
          gap: 0,
        }}
      >
        <Typography fontWeight={600}>{value}</Typography>
        {value === "Yearly" && (
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: 1,
            }}
          >
            <Typography
              sx={{
                fontWeight: 600,
                textDecoration: "line-through",
                opacity: 0.5,
                fontSize: 12,
              }}
            >
              $960.00
            </Typography>
            <Typography sx={{ fontWeight: 600, fontSize: 12 }}>
              $840.00 / year
            </Typography>
          </Box>
        )}
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: 1,
        }}
      >
        <Typography sx={{ fontWeight: 600 }}>
          {value === "Yearly" ? "$70" : "$80"} / mo
        </Typography>
        {isSelected ? (
          <HiCheckCircle color={theme.palette.accent1.main} />
        ) : (
          <MdOutlineCircle color={theme.palette.text.primary} />
        )}
      </Box>
    </Box>
  )
}
