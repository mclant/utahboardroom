import {
  Box,
  Button,
  Card,
  Divider,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material"
import PaymentOptionCard, {
  type PaymentOptionVariantType,
} from "./PaymentOptionCard"
import { useState } from "react"
import { HiCheckCircle } from "react-icons/hi"
import { MdOutlineCircle } from "react-icons/md"

type PaymentFrequencyOption = "Monthly" | "Yearly"

export default function PaymentInfoSection() {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("md"))
  const [paymentFrequencyOption, setPaymentFrequencyOption] =
    useState<PaymentFrequencyOption>("Yearly")
  const [paymentOption, setPaymentOption] =
    useState<PaymentOptionVariantType>("FullMonthly")

  return (
    <Box
      id="pricing"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: theme.palette.secondary.main,
        minHeight: "100vh",
        width: "100%",
        paddingX: isMobile ? 2 : 4,
        gap: 4,
      }}
    >
      {/* Dope option toggle here for when we add more pricing plans */}
      {/* <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 0,
          p: 0.5,
          borderRadius: 3,
          // border: `1px solid ${theme.palette.secondary.light}`,
          backgroundColor: theme.palette.primary.main,
        }}
      >
        <PaymentOptionButton
          value="Monthly"
          onClick={setPaymentFrequencyOption}
          isSelected={paymentFrequencyOption === "Monthly"}
        />
        <PaymentOptionButton
          value="Yearly"
          onClick={setPaymentFrequencyOption}
          isSelected={paymentFrequencyOption === "Yearly"}
        />
      </Box> */}
      {/* cards to maybe use when we add more pricing plans */}
      {/* <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 2,
          flexDirection: { xs: "column", md: "row" },
          width: "100%",
        }}
      >
        <PaymentOptionCard
          variant="FullMonthly"
          isSelected={paymentOption === "FullMonthly"}
        />
        <PaymentOptionCard
          variant="FullYearly"
          isSelected={paymentOption === "FullYearly"}
        />
      </Box> */}
      <Card
        sx={{
          width: "100%",
          maxWidth: "900px",
          gap: 4,
          padding: isMobile ? "12px 18px" : "24px 32px",
        }}
      >
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: 4,
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: 2,
            }}
          >
            <Box
              sx={{
                backgroundColor: `${theme.palette.accent1.main}90`,
                borderRadius: "8px",
                py: 0.5,
                px: 1,
              }}
            >
              <Typography fontSize={12} fontWeight={600}>
                Subscribe to Utah Board Room
              </Typography>
            </Box>
            <Typography
              variant={isMobile ? "h4" : "h3"}
              sx={{ textAlign: "left" }}
            >
              Get Access to the Best Climbing Training Gym
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <HiCheckCircle />
              <Typography
                variant="body1"
                sx={{ fontWeight: 600, opacity: 0.8, textAlign: "left" }}
              >
                System Boards
              </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <HiCheckCircle />
              <Typography
                variant="body1"
                sx={{ fontWeight: 600, opacity: 0.8, textAlign: "left" }}
              >
                Full Gym
              </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <HiCheckCircle />
              <Typography
                variant="body1"
                sx={{ fontWeight: 600, opacity: 0.8, textAlign: "left" }}
              >
                24/7 access
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: { xs: "center", md: "flex-start" },
              width: "100%",
              gap: 2,
            }}
          >
            <SmallPaymentOptionCard
              value="Yearly"
              isSelected={paymentFrequencyOption === "Yearly"}
              onClick={() => setPaymentFrequencyOption("Yearly")}
            />
            <SmallPaymentOptionCard
              value="Monthly"
              isSelected={paymentFrequencyOption === "Monthly"}
              onClick={() => setPaymentFrequencyOption("Monthly")}
            />
          </Box>
        </Box>
        <Divider sx={{ width: "100%" }} />
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-end",
            width: "100%",
          }}
        >
          <Button variant="contained" color="primary">
            Get Started
          </Button>
        </Box>
      </Card>
    </Box>
  )
}

function SmallPaymentOptionCard({
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

// function PaymentOptionButton({
//   value,
//   onClick,
//   isSelected,
// }: {
//   value: PaymentFrequencyOption
//   onClick: (PaymentFrequencyOption: PaymentFrequencyOption) => void
//   isSelected: boolean
// }) {
//   const theme = useTheme()
//   return (
//     <button
//       onClick={() => onClick(value)}
//       style={{
//         padding: "4px",
//         paddingRight: "8px",
//         paddingLeft: "8px",
//         borderRadius: "12px",
//         backgroundColor: isSelected
//           ? theme.palette.secondary.border
//           : theme.palette.primary.main,
//         border: "1px solid",
//         borderColor: isSelected
//           ? theme.palette.secondary.border
//           : theme.palette.primary.main,
//         cursor: "pointer",
//         transition: "all 0.3s ease",
//       }}
//     >
//       <Typography
//         color={theme.palette.text.primary}
//         sx={{ fontWeight: 600, opacity: isSelected ? 1 : 0.5 }}
//       >
//         {value}
//       </Typography>
//     </button>
//   )
// }
