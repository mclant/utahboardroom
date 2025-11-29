import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Card,
  Link,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material"
import KilterLayout from "/kilterlayout.png"
import MoonLayout from "/moonlayout.png"
import Tb2Layout from "/tb2layout.png"
import { Link as RouterLink } from "@tanstack/react-router"
import { IoCaretDown } from "react-icons/io5"
import ReviewCard from "../atoms/ReviewCard"

const reviews = [
  {
    text: "So beyond stoked for this",
    name: "Yoshi",
    date: "Oct 18",
  },
  {
    text: "Excited to pull all my tendons again, while paying you to do so ❤️",
    name: "Tate",
    date: "Oct 18",
  },
  {
    text: "Stōked!",
    name: "Kyle",
    date: "Oct 18",
  },
  {
    text: "i’m so excited!!! this is a great idea",
    name: "Elyse",
    date: "Oct 18",
  },
  {
    text: "YAYYYYYYYYYYY",
    name: "Kaleb",
    date: "Oct 19",
  },
  {
    text: "This is going to be so much fun! ",
    name: "Braden",
    date: "Oct 19",
  },
  {
    text: "Love to see the idea come to life!",
    name: "Jackson",
    date: "Oct 19",
  },
  {
    text: "super hyped to have a 24hr board gym that's dope",
    name: "Alexander",
    date: "Oct 19",
  },
  {
    text: "Stoked",
    name: "Jacob",
    date: "Oct 19",
  },
  {
    text: "Stoked for this! ",
    name: "Drew",
    date: "Oct 19",
  },
  {
    text: "I think this is arguably the smartest training area idea ever.",
    name: "Ian",
    date: "Oct 19",
  },
]

export default function IntroInfo() {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: theme.palette.primary.main,
          minHeight: "50vh",
          width: "100%",
          paddingY: 20,
          gap: 4,
        }}
      >
        <Box
          sx={{
            width: "100%",
            overflow: "hidden",
            position: "relative",
            py: 2,
          }}
        >
          {/* The scrolling track */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              width: "fit-content",
              animation: "scrollReviews 60s linear infinite",
              "@keyframes scrollReviews": {
                "0%": { transform: "translateX(0)" },
                "100%": { transform: "translateX(-50%)" },
              },
            }}
          >
            {/* Double up reviews so animation can loop seamlessly */}
            {[...reviews, ...reviews].map((review, i) => (
              <Box key={review.name + i} sx={{ minWidth: 320 }}>
                <ReviewCard
                  text={review.text}
                  name={review.name}
                  date={review.date}
                />
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: theme.palette.secondary.main,
          minHeight: "100vh",
          width: "100%",
          paddingX: 4,
          paddingY: 20,
          gap: 4,
        }}
      >
        <Typography variant={isMobile ? "h4" : "h2"}>
          Boards only climbing gym
        </Typography>
        <Typography variant="body1">
          Utah's first boards-only climbing gym. Opening with a total of 7
          boards.
        </Typography>
        <Box
          sx={{
            display: "flex",
            gap: 2,
            flexDirection: isMobile ? "column" : "row",
          }}
        >
          <Card
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 1,
            }}
          >
            <Typography variant="h6">12x12 Tension Board 2</Typography>
            <img src={Tb2Layout} />
          </Card>
          <Card
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 1,
            }}
          >
            <Typography variant="h6">10x12 Kilter Board Full Ride</Typography>
            <img src={KilterLayout} />
          </Card>
          <Card
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 1,
            }}
          >
            <Typography variant="h6">8x12 2024 Moon Board</Typography>
            <img src={MoonLayout} />
          </Card>
        </Box>
        <Button
          variant="contained"
          color="primary"
          component={RouterLink}
          to="/waitlist"
        >
          Join the waitlist
        </Button>
        <Link href="#faqsection">What is board climbing?</Link>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: theme.palette.primary.main,
          minHeight: "100vh",
          width: "100%",
          paddingX: 4,
          gap: 4,
        }}
      >
        <Typography variant={isMobile ? "h4" : "h2"}>24/7 access</Typography>
        <Typography variant="body1">
          We are open 24/7. No staff. Just you and the boards.
        </Typography>
        <Typography variant="body1">
          Memberships only, no day passes. There will also be a limited number
          of memberships available, so get on the waitlist to secure your spot.
          We don't want the board room getting too crowded.
        </Typography>
      </Box>
      <Box
        id="faqsection"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: theme.palette.secondary.main,
          minHeight: "100vh",
          width: "100%",
          paddingX: 4,
          gap: 4,
        }}
      >
        <Typography variant={isMobile ? "h4" : "h2"}>FAQ's</Typography>
        <Box sx={{ maxWidth: "800px" }}>
          <Accordion>
            <AccordionSummary expandIcon={<IoCaretDown />}>
              <Typography variant="h6" sx={{ textAlign: "left" }}>
                What is board climbing?
              </Typography>
            </AccordionSummary>
            <AccordionDetails
              sx={{ display: "flex", flexDirection: "column", gap: 1 }}
            >
              <Typography variant="body1" sx={{ textAlign: "left" }}>
                Ever increasing in popularity, board climbing uses a permanent
                set of holds on an 8x12 to 12x12 foot board, and using the
                board's connected app, the holds of one boulder problem at a
                time light up.
              </Typography>
              <Typography variant="body1" sx={{ textAlign: "left" }}>
                The boards are adjustable to different angles. This makes them
                suitable for all skill levels.
              </Typography>
              <Typography variant="body1" sx={{ textAlign: "left" }}>
                Board climbing is one of the best ways to train for real rock
                climbing. It trains your fingers to hold on to small holds, and
                your footwork to keep tension. It is also conducive to
                beginners.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary expandIcon={<IoCaretDown />}>
              <Typography variant="h6" sx={{ textAlign: "left" }}>
                How much is membership pricing?
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body1" sx={{ textAlign: "left" }}>
                $80 per month. This includes 24/7 access, and a guaranteed
                crowd-free experience.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary expandIcon={<IoCaretDown />}>
              <Typography variant="h6" sx={{ textAlign: "left" }}>
                When will the gym be open?
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body1" sx={{ textAlign: "left" }}>
                We are working on an opening date. For those on the waitlist,
                you will be guaranteed a spot. And we will notify those on the
                waitlist via email as soon as an opening date is set.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary expandIcon={<IoCaretDown />}>
              <Typography variant="h6" sx={{ textAlign: "left" }}>
                Will it get overcrowded?
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body1" sx={{ textAlign: "left" }}>
                To reduce the crowds, we will have a limited number of
                memberships available. If the board room can handle more
                members, the total number is subject to change.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary expandIcon={<IoCaretDown />}>
              <Typography variant="h6" sx={{ textAlign: "left" }}>
                Will you have any gym/lifting/climbing training equipment
                besides boards?
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body1" sx={{ textAlign: "left" }}>
                Yes. There will be hangboards, bands, free weights, and a rack
                and bench.
              </Typography>
            </AccordionDetails>
          </Accordion>
        </Box>
      </Box>
      <Box
        id="contactus"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: theme.palette.primary.main,
          minHeight: "100vh",
          width: "100%",
          paddingX: 4,
          gap: 4,
        }}
      >
        <Typography variant={isMobile ? "h4" : "h2"}>
          Want to get in contact?
        </Typography>
        <Typography variant="body1">
          If you have questions, or want to get in contact, send us an email at
          <Link
            href="mailto:matt@utahboardroom.com"
            color="accent1.main"
            sx={{ ml: "4px" }}
          >
            matt@utahboardroom.com
          </Link>
        </Typography>
      </Box>
    </>
  )
}
