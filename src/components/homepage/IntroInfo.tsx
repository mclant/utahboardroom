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
          Utah's first boards only climbing gym. We have 3 boards, with 3 more
          on the way.
        </Typography>
        {/* <Typography variant="body1">
        Our current boards include 1 12x12 Tension Board 2, 1 10x12 Kilter Board
        Full Ride, and 1 8x12 2024 Moon Board. As we grow, we are excited to add
        3 more boards to the mix.
      </Typography> */}
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
                memberships available - 150. If the board room can handle more
                than that, we will increase the amount of memberships.
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
