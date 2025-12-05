import { Box, Button, Card, Typography, useTheme } from "@mui/material"

export type PaymentOptionVariantType =
  | "FullYearly"
  | "FullMonthly"
  | "BlackOutYearly"
  | "BlackOutMonthly"

const PaymentOptionDetailsMap: Record<
  PaymentOptionVariantType,
  { headerDescription: string; monthlyPrice: string; billedText: string }
> = {
  FullYearly: {
    headerDescription: "Full 24/7 access",
    monthlyPrice: "$70",
    billedText: "annually",
  },
  FullMonthly: {
    headerDescription: "Full 24/7 access",
    monthlyPrice: "$80",
    billedText: "monthly",
  },
  BlackOutYearly: {
    headerDescription: "Black out access",
    monthlyPrice: "$55",
    billedText: "annually",
  },
  BlackOutMonthly: {
    headerDescription: "Black out access",
    monthlyPrice: "$60",
    billedText: "monthly",
  },
}

export default function PaymentOptionCard({
  variant,
  isSelected,
}: {
  variant: PaymentOptionVariantType
  isSelected: boolean
}) {
  const theme = useTheme()
  const { headerDescription, monthlyPrice, billedText } =
    PaymentOptionDetailsMap[variant]
  return (
    <Card
      sx={{
        width: "100%",
        maxWidth: { sm: "400px" },
        position: "relative",
        border:
          variant === "FullYearly"
            ? `1px solid ${theme.palette.accent1.main}`
            : `1px solid ${theme.palette.secondary.border}`,
        backgroundColor:
          variant === "FullYearly"
            ? `${theme.palette.accent1.main}10`
            : theme.palette.secondary.light,
      }}
    >
      {variant === "FullYearly" && (
        <Box
          sx={{
            position: "absolute",
            top: -10,
            right: 35,
            background: `linear-gradient(to right, ${theme.palette.accent2.main}, ${theme.palette.accent1.main})`,
            color: theme.palette.primary.main,
            padding: "4px 8px",
            borderRadius: "4px",
          }}
        >
          <Typography sx={{ fontWeight: 700 }} fontSize={14}>
            Save 12.5%
          </Typography>
        </Box>
      )}
      <Typography
        variant="body1"
        sx={{ fontWeight: 700 }}
        color={theme.palette.accent1.main}
      >
        {headerDescription}
      </Typography>
      <Box sx={{ display: "flex", alignItems: "flex-end", gap: 1 }}>
        <Typography sx={{ fontWeight: 700 }} variant="h3">
          {monthlyPrice}
        </Typography>
        <Typography fontWeight={700}>/month</Typography>
      </Box>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <Typography variant="body1" sx={{ fontWeight: 700, opacity: 0.8 }}>
          Billed
        </Typography>
        <Typography
          variant="body1"
          sx={{ fontWeight: 700, opacity: 0.8 }}
          color={theme.palette.accent2.main}
        >
          {billedText}
        </Typography>
      </Box>
      <Button variant="contained" color="primary" sx={{ width: "100%", mt: 4 }}>
        Get Started
      </Button>
    </Card>
  )
}
