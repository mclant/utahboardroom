import {
  useJoinWaitlist,
  useGetNumWaitlistUsers,
  useSubmitFeedback,
} from "@/db"
import {
  Box,
  Typography,
  useTheme,
  Button,
  Stack,
  TextField,
  Link,
  useMediaQuery,
  CircularProgress,
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
  const [isFeedbackSuccess, setIsFeedbackSuccess] = useState(false)
  const [feedback, setFeedback] = useState<string | null>(null)
  const [feedbackError, setFeedbackError] = useState<string | null>(null)
  const [feedbackLoading, setFeedbackLoading] = useState(false)
  const [userId, setUserId] = useState<string | null>(null)

  const queryClient = useQueryClient()
  const { mutateAsync: joinWaitlist } = useJoinWaitlist()
  const { mutateAsync: submitFeedback } = useSubmitFeedback()
  const { data: numWaitlistUsers, isLoading: isLoadingNumWaitlistUsers } =
    useGetNumWaitlistUsers()
  // @ts-ignore
  const remainingSpots = 200 - (numWaitlistUsers?.data?.length || 0)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setUserId(null)
    setError(null)
    // Add your form submission logic here
    try {
      // @ts-ignore
      const { data, error } = await joinWaitlist({ fullName: name, email })
      if (error) {
        throw new Error(error.details)
      }
      setUserId(data?.[0]?.id)
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

  const handleSubmitFeedback = async (e: React.FormEvent) => {
    e.preventDefault()
    setFeedbackLoading(true)
    setFeedbackError(null)
    try {
      // @ts-ignore
      const { data, error } = await submitFeedback({ userId, feedback })
      if (error) {
        throw new Error(error.details)
      }
      setIsFeedbackSuccess(true)
    } catch (error) {
      console.error(error)
      setFeedbackError(
        `There was an error submitting feedback: ${error || "Unknown error"}`
      )
    } finally {
      setFeedbackLoading(false)
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
          {isLoadingNumWaitlistUsers ? (
            <CircularProgress size={32} />
          ) : remainingSpots > 0 ? (
            <Typography variant="h6" color={theme.palette.accent1.main}>
              *Only {remainingSpots} spot{remainingSpots === 1 ? "" : "s"} left
            </Typography>
          ) : null}
        </Box>
        {success ? (
          <Box
            sx={{
              width: "100%",
              maxWidth: 400,
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            <Typography
              variant="h5"
              color={theme.palette.accent3.main}
              sx={{ textAlign: "center" }}
            >
              You have been successfully added to the waitlist! We will notify
              you with updates as we get closer to opening.
            </Typography>
            {isFeedbackSuccess ? (
              <Typography variant="body1" fontWeight={600}>
                Thank you for your feedback!
              </Typography>
            ) : (
              <>
                <Typography variant="body1" fontWeight={600}>
                  Questions, comments, or feedback?
                </Typography>
                <TextField
                  placeholder="Leave your feedback here"
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  fullWidth
                  multiline
                  rows={4}
                />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSubmitFeedback}
                  disabled={feedbackLoading}
                >
                  {feedbackLoading ? "Submitting..." : "Submit feedback"}
                </Button>
                {feedbackError && (
                  <Typography variant="body2" color={theme.palette.error.main}>
                    {feedbackError}
                  </Typography>
                )}
              </>
            )}
          </Box>
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
