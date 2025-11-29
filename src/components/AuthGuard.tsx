import {
  useSendResetPasswordEmail,
  useSignIn,
  useSignUp,
  useCreateClimber,
} from "@/db"
import {
  Box,
  Button,
  Link,
  Stack,
  TextField,
  Typography,
  Card,
} from "@mui/material"
import { useQueryClient } from "@tanstack/react-query"
import { useState } from "react"
import { useNavigate } from "@tanstack/react-router"
import { useUser } from "@/hooks/useUser"
import { USER_ROLE_TYPE } from "@/types/climber"

export default function AuthGuard({
  children,
  permissions,
  gymOwnerPermission,
}: {
  children: React.ReactNode
  permissions?: USER_ROLE_TYPE[]
  gymOwnerPermission?: boolean
}) {
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const {
    authUser,
    climber,
    isLoadingAuthUser,
    isLoadingClimber,
    handleSignOut,
    isSignOutLoading,
  } = useUser()
  const { mutateAsync: signIn } = useSignIn()
  const { mutateAsync: signUp } = useSignUp()
  const { mutateAsync: sendResetPasswordEmail } = useSendResetPasswordEmail()
  const { mutateAsync: createClimber } = useCreateClimber()

  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [signUpLoading, setSignUpLoading] = useState(false)
  const [createClimberLoading, setCreateClimberLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [signUpError, setSignUpError] = useState<string | null>(null)
  const [createClimberError, setCreateClimberError] = useState<string | null>(
    null
  )
  const [view, setView] = useState<"login" | "resetPassword" | "signUp">(
    "login"
  )
  const [signUpSuccess, setSignUpSuccess] = useState(false)
  const [emailSentSuccess, setEmailSentSuccess] = useState(false)

  if (isLoadingAuthUser || isLoadingClimber) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: 4,
          height: "100vh",
          width: "100vw",
        }}
      >
        <Card>
          <Typography fontWeight={700}>Loading...</Typography>
        </Card>
      </Box>
    )
  }

  if (!authUser) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: 4,
          height: "100vh",
          width: "100vw",
        }}
      >
        <Card>
          <Typography variant="h6">Authentication Required</Typography>
          {view === "login" ? (
            <>
              <Stack
                spacing={2}
                component="form"
                sx={{ width: { xs: "100%", sm: "350px" } }}
                onSubmit={async (e) => {
                  e.preventDefault()
                  setLoading(true)
                  try {
                    // @ts-ignore
                    const { data, error } = await signIn({ email, password })
                    if (error) {
                      throw error
                    }
                    await queryClient.invalidateQueries({
                      queryKey: ["getAuthUser"],
                    })
                    await queryClient.invalidateQueries({
                      queryKey: ["getClimber", data?.user?.id],
                    })
                  } catch (error) {
                    // @ts-ignore
                    setError(error.message)
                  } finally {
                    setLoading(false)
                  }
                }}
              >
                <TextField
                  label="Email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  sx={{ width: "100%" }}
                  required
                />
                <TextField
                  label="Password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  sx={{ width: "100%" }}
                  required
                />
                <Link
                  color="accent1.main"
                  onClick={() => setView("resetPassword")}
                  style={{ marginTop: 2, alignSelf: "flex-start" }}
                >
                  Forgot password?
                </Link>
                <Button
                  loading={loading}
                  variant="contained"
                  color="primary"
                  type="submit"
                >
                  Sign In
                </Button>
                {error && <Typography color="error">{error}</Typography>}
              </Stack>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ textAlign: "center" }}
              >
                Don't have an account?
                <Link
                  color="accent1.main"
                  onClick={() => setView("signUp")}
                  sx={{ marginLeft: 0.5 }}
                >
                  Create one
                </Link>
              </Typography>
            </>
          ) : view === "resetPassword" ? (
            <>
              {emailSentSuccess ? (
                <Typography>Email sent successfully</Typography>
              ) : (
                <>
                  <Stack
                    spacing={2}
                    component="form"
                    onSubmit={async (e) => {
                      e.preventDefault()
                      setLoading(true)
                      try {
                        // @ts-ignore
                        const { error } = await sendResetPasswordEmail({
                          email,
                        })
                        if (error) {
                          throw error
                        }
                        setEmailSentSuccess(true)
                      } catch (error) {
                        // @ts-ignore
                        setError(error.message)
                      } finally {
                        setLoading(false)
                      }
                    }}
                  >
                    <TextField
                      label="Email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      sx={{ width: "100%" }}
                      required
                    />
                    <Button
                      loading={loading}
                      variant="contained"
                      color="primary"
                      type="submit"
                    >
                      Reset Password
                    </Button>
                  </Stack>
                </>
              )}
              <Link color="primary.main" onClick={() => setView("login")}>
                Log in
              </Link>
            </>
          ) : (
            view === "signUp" && (
              <>
                {signUpSuccess ? (
                  <Box>
                    <Typography>
                      Sign up successful! Please confirm your email.
                    </Typography>
                    <Link
                      color="accent1.main"
                      onClick={() => navigate({ to: "/" })}
                    >
                      Go to home
                    </Link>
                  </Box>
                ) : (
                  <>
                    <Stack
                      spacing={2}
                      component="form"
                      sx={{ width: { xs: "100%", sm: "350px" } }}
                      onSubmit={async (e) => {
                        e.preventDefault()
                        setSignUpError(null)
                        setSignUpLoading(true)
                        try {
                          // @ts-ignore
                          const { data, error } = await signUp({
                            email,
                            password,
                          })

                          if (error) {
                            throw error
                          }
                          await queryClient.invalidateQueries({
                            queryKey: ["getAuthUser"],
                          })
                          setSignUpSuccess(true)
                        } catch (error) {
                          // @ts-ignore
                          setSignUpError(error.message)
                        } finally {
                          setSignUpLoading(false)
                        }
                      }}
                    >
                      <TextField
                        label="Email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        sx={{ width: "100%" }}
                        required
                      />
                      <TextField
                        label="Password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        sx={{ width: "100%" }}
                        required
                      />
                      {/* <TextField
                        label="Password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        sx={{ width: "100%" }}
                        required
                      /> */}
                      <Button
                        loading={signUpLoading}
                        variant="contained"
                        color="primary"
                        type="submit"
                      >
                        Sign Up
                      </Button>
                      {signUpError && (
                        <Typography color="error">{signUpError}</Typography>
                      )}
                    </Stack>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ textAlign: "center" }}
                    >
                      Already have an account?
                      <Link
                        color="accent1.main"
                        onClick={() => setView("login")}
                        sx={{ marginLeft: 0.5 }}
                      >
                        Sign in
                      </Link>
                    </Typography>
                  </>
                )}
              </>
            )
          )}
        </Card>
      </Box>
    )
  } else if (!climber) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: 4,
          height: "100vh",
          width: "100vw",
        }}
      >
        <Card>
          <Typography>
            Please fill in your information to complete your profile
          </Typography>
          <Stack
            spacing={2}
            component="form"
            sx={{ width: { xs: "100%", sm: "350px" } }}
            onSubmit={async (e) => {
              e.preventDefault()
              setCreateClimberLoading(true)
              try {
                // @ts-ignore
                const { data, error } = await createClimber({
                  userId: authUser?.id || "",
                  firstName,
                  lastName,
                  email: authUser?.email || "",
                })
                if (error) {
                  throw error
                }
                await queryClient.invalidateQueries({
                  queryKey: ["getClimber", authUser?.id],
                })
              } catch (error) {
                // @ts-ignore
                setCreateClimberError(error.message)
              } finally {
                setCreateClimberLoading(false)
              }
            }}
          >
            <TextField
              label="First Name"
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              sx={{ width: "100%" }}
              required
            />
            <TextField
              label="Last Name"
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              sx={{ width: "100%" }}
              required
            />
            <Button
              loading={createClimberLoading}
              variant="contained"
              color="primary"
              type="submit"
            >
              Finish sign up
            </Button>
            {createClimberError && (
              <Typography color="error">{createClimberError}</Typography>
            )}
            <Button
              loading={isSignOutLoading}
              variant="contained"
              color="secondary"
              onClick={async () => {
                try {
                  await handleSignOut()
                } catch (error) {
                  // @ts-ignore
                  setCreateClimberError(error.message)
                }
              }}
            >
              Sign out
            </Button>
          </Stack>
        </Card>
      </Box>
    )
  }

  if (
    permissions?.length &&
    !permissions?.includes(climber?.user_type as USER_ROLE_TYPE)
  ) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: 4,
          height: "100vh",
          width: "100%",
        }}
      >
        <Card>
          <Typography>You are not authorized to access this page</Typography>
        </Card>
      </Box>
    )
  }
  if (gymOwnerPermission && !climber?.Gyms?.id) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: 4,
          height: "100vh",
          width: "100%",
        }}
      >
        <Card>
          <Typography>You are not authorized to access this page</Typography>
        </Card>
      </Box>
    )
  }

  return <>{children}</>
}
