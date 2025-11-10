import { useState, useEffect } from "react"
import {
  Box,
  Typography,
  useTheme,
  LinearProgress,
  Button,
  TextField,
} from "@mui/material"
import {
  createFileRoute,
  Link as RouterLink,
  useSearch,
} from "@tanstack/react-router"
import { FaMinus, FaPlus } from "react-icons/fa"
import {
  useGetWaitlistUsers,
  useSubmitBoardVotes,
  useGetBoardVotes,
} from "@/db"
import { HiExternalLink } from "react-icons/hi"

export const Route = createFileRoute("/surveys/board-selection")({
  component: BoardSelection,
})

const BOARD_MAP: Record<number, OptionType> = {
  1: {
    name: "Tension Board 1",
    votes: 0,
  },
  2: {
    name: "Tension Board 2",
    votes: 0,
  },
  3: {
    name: "Kilter Board Original",
    votes: 0,
  },
  4: {
    name: "Kilter Board Full Ride",
    votes: 0,
  },
  5: {
    name: "Moon Board 2024",
    votes: 0,
  },
  6: {
    name: "Moon Board 2016",
    votes: 0,
  },
  7: {
    name: "Moon Board 2017",
    votes: 0,
  },
  8: {
    name: "Moon Board 2019",
    votes: 0,
  },
  9: {
    name: "Woods Board",
    votes: 0,
  },
  10: {
    name: "Grasshopper",
    votes: 0,
  },
  11: {
    name: "Beastmaker Board",
    votes: 0,
  },
  12: {
    name: "Walltopia Quantum Board",
    votes: 0,
  },
  13: {
    name: "Decoy Board",
    votes: 0,
  },
  14: {
    name: "Spray Wall",
    votes: 0,
  },
}

type OptionType = {
  name: string
  votes: number
}

const ALLOWED_VOTES_NUM = 7

export default function BoardSelection() {
  const theme = useTheme()
  const params = useSearch({ strict: false })
  // @ts-ignore
  const emailInQuery = params?.email
  const { data: waitlistUsers, isLoading: isLoadingWaitlistUsers } =
    useGetWaitlistUsers()
  const { data: boardVotes, isLoading: isLoadingBoardVotes } =
    useGetBoardVotes()
  const { mutateAsync: submitBoardVotes } = useSubmitBoardVotes()

  const [votesUsed, setVotesUsed] = useState(0)
  const [votesMap, setVotesMap] =
    useState<Record<number, OptionType>>(BOARD_MAP)
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<boolean>(false)

  useEffect(() => {
    if (emailInQuery) {
      setEmail(emailInQuery)
    }
  }, [emailInQuery])

  const addVote = (id: number) => {
    if (votesUsed >= ALLOWED_VOTES_NUM) return
    setVotesMap((prev) => ({
      ...prev,
      [id]: { ...prev[id], votes: prev[id].votes + 1 },
    }))
    setVotesUsed((prev) => prev + 1)
  }

  const removeVote = (id: number) => {
    if (votesUsed <= 0) return
    setVotesMap((prev) => ({
      ...prev,
      [id]: { ...prev[id], votes: prev[id].votes - 1 },
    }))
    setVotesUsed((prev) => prev - 1)
  }

  const handleSubmitVotes = async () => {
    setIsLoading(true)
    setError(null)
    setSuccess(false)
    try {
      if (!email) {
        throw new Error(
          "Please enter your email to submit your votes. (You must be on the waitlist)"
        )
      }

      // @ts-ignore
      const emailExists = waitlistUsers?.data?.some(
        (user: any) => user.email === email
      )
      if (!emailExists) {
        throw new Error(
          "Looks like you're not on the waitlist. Please join the waitlist first."
        )
      }

      // @ts-ignore
      const boardVoteExists = boardVotes?.data?.some(
        (vote: any) => vote.email === email
      )
      if (boardVoteExists) {
        throw new Error("You've already submitted your votes.")
      }

      if (votesUsed <= 0) {
        throw new Error("You must submit at least one vote.")
      }

      // @ts-ignore
      const { data, error } = await submitBoardVotes({ email, votesMap })
      if (error) {
        throw new Error(error.details)
      }
      setSuccess(true)
    } catch (error) {
      console.error(error)
      setError(
        error instanceof Error ? error.message : "An unknown error occurred"
      )
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.primary.main,
        height: "auto",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingBottom: 10,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: {
            xs: 2,
            sm: 4,
          },
          maxWidth: {
            xs: "100%",
            sm: "800px",
          },
          width: "100%",
          gap: 4,
        }}
      >
        <Typography variant="h4">Board Selection</Typography>
        <Box
          sx={{
            width: "100%",
            maxWidth: { xs: "100%", sm: "400px" },
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 1,
          }}
        >
          <Typography variant="h6" fontWeight={700}>
            Votes Used: {votesUsed}/{ALLOWED_VOTES_NUM}
          </Typography>
          <LinearProgress
            value={(votesUsed / ALLOWED_VOTES_NUM) * 100}
            variant="determinate"
          />
          <Typography variant="body2">
            *You have a total of {ALLOWED_VOTES_NUM} votes, and you can vote
            multiple times for the same board. You must be on the waitlist to
            vote, and you can only submit one batch of votes.
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 2,
            width: "100%",
          }}
        >
          {Object.entries(votesMap).map(([key, option]) => (
            <Box
              key={key}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 2,
                width: "100%",
                borderBottom: `1px solid ${theme.palette.text.disabled}`,
                paddingBottom: 2,
              }}
            >
              <Typography variant="h5" sx={{ textAlign: "left" }}>
                {option.name}
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <button
                  style={{ cursor: "pointer" }}
                  onClick={() => removeVote(Number(key))}
                  disabled={option.votes <= 0}
                >
                  <FaMinus size={20} />
                </button>
                <Typography variant="h5" fontWeight={700}>
                  {option.votes}
                </Typography>
                <button
                  style={{ cursor: "pointer" }}
                  onClick={() => addVote(Number(key))}
                  disabled={option.votes >= ALLOWED_VOTES_NUM}
                >
                  <FaPlus size={20} />
                </button>
              </Box>
            </Box>
          ))}
        </Box>
        {success ? (
          <Typography variant="h5" color={theme.palette.accent3.main}>
            Thank you! Your votes have been submitted successfully.
          </Typography>
        ) : (
          <>
            <TextField
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
            />
            {error && (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 1,
                }}
              >
                <Typography variant="body2" color={theme.palette.error.main}>
                  {error}
                </Typography>
                <RouterLink
                  to="/waitlist"
                  style={{
                    color: theme.palette.accent1.main,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "3px",
                  }}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Join the waitlist
                  <HiExternalLink />
                </RouterLink>
              </Box>
            )}
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmitVotes}
              disabled={
                isLoading || isLoadingWaitlistUsers || isLoadingBoardVotes
              }
            >
              {isLoading ? "Submitting..." : "Submit Votes"}
            </Button>
          </>
        )}
      </Box>
    </Box>
  )
}
