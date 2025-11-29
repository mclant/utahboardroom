import "dotenv/config"
// import { Resend } from "resend"
import { createClient } from "@supabase/supabase-js"
// import { WaitlistSurveyEmail } from "../emails/waitlistSurvey" // Update this path to your email template
import dayjs from "dayjs"

/*  LOG
sent survey email to 25 users, on Sat nov 29th (to newest users, created after nov 13th) as of today, all up to date.
*/

// terminal command: npx tsx src/scripts/send-survey-email-to-waitlist.ts
// Initialize clients
// const resend = new Resend(process.env.VITE_RESEND_API_KEY!)
const supabase = createClient(
  process.env.VITE_SUPABASE_URL!,
  process.env.VITE_SUPABASE_ANON_KEY! // Use service role key for admin access
)

// interface WaitlistUser {
//   id: string
//   email: string
//   // Add any other fields from your table that you want to use
//   full_name: string
//   created_at?: string
// }

async function sendWaitlistEmails() {
  try {
    console.log("📧 Starting email send process...\n")

    // Fetch all waitlist users
    const { data: users, error } = await supabase
      .from("WaitlistUsers")
      .select("*")
    // @ts-ignore

    if (error) {
      console.error("❌ Error fetching users from Supabase:", error)
      process.exit(1)
    }

    if (!users || users.length === 0) {
      console.log("No users found in waitlist")
      return
    }

    const newUsers = users?.filter((user) => {
      return dayjs(user.created_at).isAfter(dayjs("2025-11-12"))
    })
    console.log("newUsers: ", newUsers)

    console.log(`Found ${newUsers.length} users to email\n`)

    // Send emails
    let successCount = 0
    let failCount = 0

    // const testUsers = [
    //   {
    //     email: "matthewclant@gmail.com",
    //     full_name: "Matthew Clant",
    //   },
    //   // {
    //   //   email: "tanner.m.wilks@gmail.com",
    //   //   full_name: "Tanner",
    //   // },
    // ]

    // for (const user of newUsers as WaitlistUser[]) {
    //   try {
    //     console.log(`Sending to ${user.email}...`)

    //     const response = await resend.emails.send({
    //       from: "Matt at Utah Board Room <matt@utahboardroom.com>",
    //       to: user.email,
    //       subject: "Utah Board Room survey",
    //       react: WaitlistSurveyEmail({
    //         name: user.full_name,
    //         email: user.email,
    //       }),
    //     })
    //     if (response.error) {
    //       throw new Error(response.error.message)
    //     }

    //     successCount++
    //     console.log(`✅ Sent to ${user.email}`)

    //     // Optional: Add a small delay between emails to avoid rate limits (rate limit on free plan is 2 per second)(and 100 emails per day 😭)
    //     await new Promise((resolve) => setTimeout(resolve, 600))
    //   } catch (error) {
    //     failCount++
    //     console.error(`❌ Failed to send to ${user.email}:`, error)
    //   }
    // }

    console.log("\n=== Summary ===")
    console.log(`✅ Successfully sent: ${successCount}`)
    console.log(`❌ Failed: ${failCount}`)
    console.log(`📊 Total: ${users.length}`)
  } catch (error) {
    console.error("❌ Unexpected error:", error)
    process.exit(1)
  }
}

// Run the script
// terminal command: npx tsx src/scripts/send-survey-email-to-waitlist.ts
sendWaitlistEmails()
  .then(() => {
    console.log("\n✨ Done!")
    process.exit(0)
  })
  .catch((error) => {
    console.error("Fatal error:", error)
    process.exit(1)
  })
