import { useJoinWaitlist, useGetNumWaitlistUsers } from "@/db"
import {
  Box,
  Typography,
  useTheme,
  Button,
  Stack,
  TextField,
  Link,
  useMediaQuery,
} from "@mui/material"
import { useQueryClient } from "@tanstack/react-query"
import { createFileRoute, Link as RouterLink } from "@tanstack/react-router"
import { useState } from "react"

export const Route = createFileRoute("/waitlist")({
  component: RouteComponent,
})

function RouteComponent() {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  const queryClient = useQueryClient()
  const { mutateAsync: joinWaitlist } = useJoinWaitlist()
  const { data: numWaitlistUsers } = useGetNumWaitlistUsers()
  // @ts-ignore
  const remainingSpots = 150 - (numWaitlistUsers?.data?.length || 0)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    console.log("Form submitted:", { name, email })
    // Add your form submission logic here
    try {
      // @ts-ignore
      const { data, error } = await joinWaitlist({ fullName: name, email })
      if (error) {
        throw new Error(error.details)
      }
      await queryClient.invalidateQueries({
        queryKey: ["getNumWaitlistUsers"],
      })
      setSuccess("You're on the waitlist!")
    } catch (error) {
      console.error(error)
      setError(
        `There was an error joining the waitlist: ${error || "Unknown error"}`
      )
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh",
      }}
    >
      {!isMobile && (
        <Box
          sx={{
            flex: 1,
            height: "100%",
            backgroundColor: theme.palette.primary.main,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: {
              xs: 2,
              md: 4,
              lg: 6,
            },
          }}
        >
          <Typography variant="h3">Utah Board Room</Typography>
          <Typography
            variant="body1"
            sx={{
              mt: 2,
              color: theme.palette.accent3.main,
              fontWeight: 500,
            }}
          >
            First location: Orem Utah
          </Typography>
        </Box>
      )}
      <Box
        sx={{
          flex: 1,
          height: {
            xs: "auto",
            md: "100%",
          },
          borderRadius: 4,
          backgroundColor: theme.palette.secondary.main,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: {
            xs: 2,
            md: 4,
            lg: 6,
          },
          gap: 3,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography variant="h4">
            {isMobile ? "Utah Board Room waitlist" : "Join the waitlist"}
          </Typography>
          <Typography variant="h6" color={theme.palette.accent1.main}>
            *Only {remainingSpots} spots left
          </Typography>
        </Box>
        {success ? (
          <Typography
            variant="h5"
            color={theme.palette.accent3.main}
            sx={{ textAlign: "center" }}
          >
            You have been successfully added to the waitlist! We will notify you
            when we are open.
          </Typography>
        ) : (
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ width: "100%", maxWidth: 400 }}
          >
            <Stack spacing={2} alignItems="center">
              <TextField
                label="Full Name"
                placeholder="Enter your full name"
                value={name}
                onChange={(e) => {
                  setError(null)
                  setName(e.target.value)
                }}
                required
                fullWidth
              />

              <TextField
                label="Email Address"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => {
                  setError(null)
                  setEmail(e.target.value)
                }}
                required
                fullWidth
                // helperText="We'll never share your email with anyone else."
              />

              <Button
                type="submit"
                variant="contained"
                fullWidth
                size="large"
                disabled={isLoading}
              >
                {isLoading ? "Joining..." : "Join the Waitlist"}
              </Button>
              {error && (
                <Typography variant="body2" color={theme.palette.error.main}>
                  {error}
                </Typography>
              )}
            </Stack>
          </Box>
        )}
        <RouterLink to="/">
          <Link>Learn More</Link>
        </RouterLink>
      </Box>
    </Box>
  )
}
