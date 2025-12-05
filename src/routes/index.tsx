import { createFileRoute } from "@tanstack/react-router"
import { Box, Typography, useMediaQuery, useTheme, Button } from "@mui/material"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { TextPlugin } from "gsap/dist/TextPlugin"
import Header from "../components/Header"
import Footer from "../components/Footer"
import { Link as RouterLink } from "@tanstack/react-router"
import IntroInfo from "../components/homepage/IntroInfo"

gsap.registerPlugin(useGSAP, TextPlugin)

export const Route = createFileRoute("/")({
  component: App,
})

function App() {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))

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
          Utah Board Room
        </Typography>
        <Typography
          className="supportText"
          variant={isMobile ? "body1" : "h5"}
          color={theme.palette.accent3.main}
        >
          Coming to Orem, Utah
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Button variant="outlined" color="primary" href="/#pricing">
            Pricing
          </Button>
          <Button
            variant="contained"
            color="primary"
            component={RouterLink}
            to="/waitlist"
          >
            Join the waitlist
          </Button>
        </Box>
      </BannerSection>
      <IntroInfo />
      <BannerSection bgColor={theme.palette.primary.main}>
        <Typography variant={isMobile ? "h5" : "h3"}>
          200 total spots
        </Typography>
        <RouterLink to="/waitlist">
          <Button variant="contained" color="primary">
            Join the waitlist
          </Button>
        </RouterLink>
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
