import OnboardingLayout from "@/components/OnboardingLayout"
import { useSignUp } from "@/db"
import { Box, Button, Stack, TextField, Typography } from "@mui/material"
import { useQueryClient } from "@tanstack/react-query"
import { createFileRoute, useNavigate } from "@tanstack/react-router"
import { useState } from "react"

export const Route = createFileRoute("/onboarding/email")({
  component: RouteComponent,
})

function RouteComponent() {
  const queryClient = useQueryClient()
  const { mutateAsync: signUp } = useSignUp()
  const navigate = useNavigate()

  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [success, setSuccess] = useState<boolean>(false)

  return (
    <OnboardingLayout progress={15}>
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
              const { data, error } = await signUp({
                email,
                password,
                emailRedirectTo:
                  "http://localhost:3000/onboarding/confirm-email",
              })

              if (error) {
                throw error
              }
              setSuccess(true)
              await navigate({
                to: "/onboarding/confirm-email",
                search: { email },
              })
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
              Sign up with your email
            </Typography>
            <Typography variant="body1" sx={{ opacity: 0.7 }}>
              We will email you a confirmation code
            </Typography>
          </Box>
          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={(e) => {
              setError(null)
              setEmail(e.target.value)
            }}
            sx={{ width: "100%" }}
            required
          />
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => {
              setError(null)
              setPassword(e.target.value)
            }}
            sx={{ width: "100%" }}
            required
          />
          <Button
            loading={loading}
            variant="contained"
            color="primary"
            type="submit"
            disabled={!email || !password}
          >
            Sign Up
          </Button>
          {error && <Typography color="error">{error}</Typography>}
        </Stack>
      </Box>
    </OnboardingLayout>
  )
}
