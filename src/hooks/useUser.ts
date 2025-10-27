import { useGetAuthUser, useGetClimber, useSignOut } from "@/db"
import { useQueryClient } from "@tanstack/react-query"
import { useState } from "react"

export function useUser() {
  const queryClient = useQueryClient()
  const { mutateAsync: signOutSupabase } = useSignOut()
  const { data: authUserData, isLoading: isLoadingAuthUser } = useGetAuthUser()
  const authUser = authUserData?.data?.user
  const { data: climberData, isLoading: isLoadingClimber } = useGetClimber({
    userId: authUser?.id || "",
  })
  // @ts-ignore
  const climber = climberData?.data?.[0]

  const [isSignOutLoading, setIsSignOutLoading] = useState(false)

  const handleSignOut = async () => {
    setIsSignOutLoading(true)
    try {
      const userId = authUser?.id
      await signOutSupabase()
      await queryClient.invalidateQueries({
        queryKey: ["getAuthUser"],
      })
      await queryClient.invalidateQueries({
        queryKey: ["getClimber", userId],
      })
    } catch (error) {
      console.error(error)
      throw error
    } finally {
      setIsSignOutLoading(false)
    }
  }

  const isLoading = isLoadingAuthUser || isLoadingClimber
  return {
    authUser,
    climber,
    isLoadingAuthUser,
    isLoadingClimber,
    isLoading,
    handleSignOut,
    isSignOutLoading,
  }
}
