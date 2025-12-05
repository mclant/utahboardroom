import OnboardingLayout from "@/components/OnboardingLayout"
import { Box, Typography } from "@mui/material"
import { createFileRoute } from "@tanstack/react-router"
import { useUser } from "@/hooks/useUser"
import { SmallPaymentOptionCard } from "@/components/SmallPaymentOptionCard"
import { useState } from "react"
import type { PaymentFrequencyOption } from "@/components/homepage/PaymentInfoSection"
import { loadStripe } from "@stripe/stripe-js"
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from "@stripe/react-stripe-js"

export const Route = createFileRoute("/onboarding/payment")({
  component: RouteComponent,
})

const stripePromise = loadStripe(
  "pk_test_51SYc8ZBHyvdFO1ma2MtQeMlNWWCJ1qfo6vxSBqEhlIv0uEMCQgfXvPKj1YLpQ2OtsuMxuuhF7GipxHoAFE1i0NpQ00aSbdYrC0"
)

function RouteComponent() {
  const { authUser } = useUser()
  const [paymentFrequencyOption, setPaymentFrequencyOption] =
    useState<PaymentFrequencyOption>("Yearly")

  return (
    <OnboardingLayout progress={45}>
      <Box
        sx={{ width: "100%", display: "flex", flexDirection: "column", gap: 3 }}
      >
        <Typography variant="h5" fontWeight={700}>
          Select your plan
        </Typography>
        <Box
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
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
    </OnboardingLayout>
  )
}
