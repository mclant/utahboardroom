import {
  Body,
  Button,
  Container,
  Head,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components"

export const WaitlistSurveyEmail = ({
  name,
  email,
}: {
  name: string
  email: string
}) => (
  <Html>
    <Head />
    <Body style={main}>
      <Preview>Utah Board Room survey - don't forget to vote!</Preview>
      <Container style={container}>
        <Section style={box}>
          <Text style={paragraph}>Hey {name},</Text>
          <Text style={paragraph}>
            Thanks for joining the Board Room waitlist, we are stoked to have
            you!
          </Text>
          <Text style={paragraph}>
            In case you missed our previous email, we sent out a survey to get
            your votes on which boards you want to see in the Board Room.
          </Text>
          <Button
            style={button}
            href={`https://utahboardroom.com/surveys/board-selection?email=${email}`}
          >
            Take the survey
          </Button>
          <Text style={paragraph}>
            Although we have already received a lot of feedback, the types of
            boards are still subject to change. Vote while there is still time!
          </Text>
          <Text style={{ ...paragraph, fontWeight: "bold", color: "#00D4FF" }}>
            Opening day coming soon
          </Text>
          <Text style={paragraph}>
            Soon we will be announcing an opening date, we have our signts set
            on early next year.
          </Text>
          <Text style={paragraph}>
            Your experience in the gym, and making the best training tools
            available to you to help you reach your highest potential, are our
            top priorities. Please reach out to{" "}
            <Link style={anchor} href="mailto:matt@utahboardroom.com">
              matt@utahboardroom.com
            </Link>{" "}
            if you have any questions, concerns, or feedback.
          </Text>
          <Text style={paragraph}>
            Thanks again for your psych in this project and we look forward to
            seeing you in the Board Room. More updates to come as we get closer
            to opening!
          </Text>
          <Text style={paragraph}>— Matt at Utah Board Room</Text>
          <Button
            style={button}
            href={`https://utahboardroom.com/surveys/board-selection?email=${email}`}
          >
            Take the survey
          </Button>
          <Hr style={hr} />
          <Text style={footer}>Utah Board Room LLC, Orem Utah 2025</Text>
        </Section>
      </Container>
    </Body>
  </Html>
)

export default WaitlistSurveyEmail

const main = {
  backgroundColor: "#1A1A1D",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
}

const container = {
  backgroundColor: "#0A0A0B",
  margin: "0 auto",
  padding: "20px 0 48px",
  marginBottom: "64px",
}

const box = {
  padding: "0 48px",
}

const hr = {
  borderColor: "#e6ebf1",
  margin: "20px 0",
}

const paragraph = {
  color: "#E4E4E7",

  fontSize: "16px",
  lineHeight: "24px",
  textAlign: "left" as const,
}

const anchor = {
  color: "#00D4FF",
}

const button = {
  backgroundColor: "#1A1A1D",
  borderRadius: "5px",
  color: "#00D4FF",
  fontSize: "16px",
  fontWeight: "bold",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "block",
  padding: "10px",
}

const footer = {
  color: "#00D4FF",
  fontSize: "12px",
  lineHeight: "16px",
  fontWeight: "bold",
}
