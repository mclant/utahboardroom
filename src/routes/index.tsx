import { createFileRoute } from "@tanstack/react-router"
import { Box, Typography, useMediaQuery, useTheme, Button } from "@mui/material"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { TextPlugin } from "gsap/dist/TextPlugin"
import Header from "../components/Header"
import Footer from "../components/Footer"
import alexKilterImg from "/alexKilter.jpg"
import tb2Image from "/tb2.jpg"
import moonboardImg from "/moonboard.jpg"
import kilterImg from "/kilterboardsingle.jpg"
import trainingImg from "/training.jpg"
import locationImg from "/gymlocation.png"

gsap.registerPlugin(useGSAP, TextPlugin)

export const Route = createFileRoute("/")({
  component: App,
})

function App() {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))

  useGSAP(() => {
    gsap.to(".introText", {
      text: "Kilter Board",
      duration: 0.001,
      delay: 0.15,
    })
    gsap.to(".introText", {
      text: "Pusher",
      duration: 0.001,
      delay: 0.3,
    })
    gsap.to(".introText", {
      text: "Moon Board",
      duration: 0.001,
      delay: 0.45,
    })
    gsap.to(".introText", {
      text: "Tension Climbing",
      duration: 0.001,
      delay: 0.6,
    })
    gsap.to(".introText", {
      text: "Kilter Grips",
      duration: 0.001,
      delay: 0.75,
    })
    gsap.to(".introText", {
      text: "Beastmaker",
      duration: 0.001,
      delay: 0.9,
    })
    gsap.to(".introText", {
      text: "Utah Board Room",
      duration: 0.001,
      delay: 1.05,
    })
    gsap.from("#header", {
      y: -50,
      opacity: 0,
      delay: 2,
      duration: 1.5,
    })
    gsap.from(".supportText", {
      y: 50,
      opacity: 0,
      delay: 2,
      duration: 1.5,
    })
  }, {})

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: theme.palette.primary.main,
        height: "auto",
      }}
    >
      <Header />
      <BannerSection
        bgColor={theme.palette.primary.main}
        style={{ flexDirection: "column", gap: 2 }}
      >
        <Typography className="introText" variant={isMobile ? "h3" : "h1"}>
          Tension Board 2
        </Typography>
        <Typography
          className="supportText"
          variant={isMobile ? "body1" : "h5"}
          color={theme.palette.accent3.main}
        >
          Coming to Orem, Utah
        </Typography>
      </BannerSection>
      <BannerSection
        bgColor={theme.palette.secondary.main}
        imageSrc={alexKilterImg}
        title="6 boards"
      />
      <BannerSection
        bgColor={theme.palette.primary.main}
        imageSrc={tb2Image}
        title="Tension Board 2 X2"
        style={{ flexDirection: "row-reverse" }}
      />
      <BannerSection
        bgColor={theme.palette.secondary.main}
        imageSrc={kilterImg}
        title="Kilter Board X2"
      />
      <BannerSection
        bgColor={theme.palette.primary.main}
        imageSrc={moonboardImg}
        title="Moon Board X2"
        style={{ flexDirection: "row-reverse" }}
      />
      <BannerSection
        bgColor={theme.palette.secondary.main}
        imageSrc={trainingImg}
        title="Training/lifting equipment"
      />
      <BannerSection
        bgColor={theme.palette.primary.main}
        imageSrc={locationImg}
        title="1077 South 1680 West Orem, Utah"
        style={{ flexDirection: "row-reverse" }}
      />
      <BannerSection bgColor={theme.palette.secondary.main}>
        <Typography variant={isMobile ? "h5" : "h3"}>
          150 total spots
        </Typography>
        <Button variant="contained" color="primary">
          Join the waitlist
        </Button>
      </BannerSection>
      <Footer />
    </Box>
  )
}

function BannerSection({
  bgColor,
  imageSrc,
  title,
  style,
  children,
}: {
  bgColor: string
  imageSrc?: string
  title?: string
  style?: React.CSSProperties
  children?: React.ReactNode
}) {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: bgColor,
        minHeight: "100vh",
        width: "100%",
        paddingX: 4,
        gap: 4,
        ...style,
      }}
    >
      {title && (
        <Typography variant={isMobile ? "h5" : "h2"}>{title}</Typography>
      )}
      {imageSrc && (
        <ImageContainer>
          <img src={imageSrc} alt="tb2" />
        </ImageContainer>
      )}
      {children && children}
    </Box>
  )
}

function ImageContainer({ children }: { children: React.ReactNode }) {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))

  return (
    <Box
      sx={{
        borderRadius: 8,
        width: isMobile ? "100%" : "50vw",
        height: isMobile ? "40vh" : "70vh",
        overflow: "hidden",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {children}
    </Box>
  )
}
