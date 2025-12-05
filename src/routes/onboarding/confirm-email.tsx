import OnboardingLayout from "@/components/OnboardingLayout"
import { useVerifyEmail } from "@/db"
import { Box, Button, Stack, TextField, Typography } from "@mui/material"
import { useQueryClient } from "@tanstack/react-query"
import {
  createFileRoute,
  useNavigate,
  useParams,
  useSearch,
} from "@tanstack/react-router"
import { useState } from "react"
import { useUser } from "@/hooks/useUser"

export const Route = createFileRoute("/onboarding/confirm-email")({
  component: RouteComponent,
})

function RouteComponent() {
  const queryClient = useQueryClient()
  const { mutateAsync: verifyEmail } = useVerifyEmail()
  const navigate = useNavigate()

  const params = useSearch({ strict: false })
  // @ts-ignore
  const emailInQuery = params?.email

  const [confirmCode, setConfirmCode] = useState<string>("")
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [success, setSuccess] = useState<boolean>(false)

  return (
    <OnboardingLayout progress={30}>
      <Box
        sx={{ width: "100%", display: "flex", flexDirection: "column", gap: 3 }}
      >
        <Stack
          spacing={2}
          component="form"
          sx={{ width: "100%" }}
          onSubmit={async (e) => {
            e.preventDefault()
            setError(null)
            setLoading(true)
            try {
              // @ts-ignore
              const { data, error } = await verifyEmail({
                token: confirmCode,
                email: emailInQuery,
              })

              if (error) {
                throw error
              }
              await queryClient.invalidateQueries({
                queryKey: ["getAuthUser"],
              })
              setSuccess(true)
              await navigate({ to: "/onboarding/payment" })
            } catch (error) {
              // @ts-ignore
              setError(error.message)
            } finally {
              setLoading(false)
            }
          }}
        >
          <Box
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              gap: 1,
            }}
          >
            <Typography variant="h5" fontWeight={700}>
              Verify your email
            </Typography>
            <Typography variant="body1" sx={{ opacity: 0.7 }}>
              We just send a 6 digit code to {emailInQuery}, enter it below
            </Typography>
          </Box>
          <TextField
            label="Confirmation Code"
            type="text"
            value={confirmCode}
            onChange={(e) => {
              setError(null)
              setConfirmCode(e.target.value)
            }}
            sx={{ width: "100%" }}
            required
          />
          <Button
            loading={loading}
            variant="contained"
            color="primary"
            type="submit"
            disabled={!confirmCode}
          >
            Verify Email
          </Button>
          {error && <Typography color="error">{error}</Typography>}
        </Stack>
      </Box>
    </OnboardingLayout>
  )
}
