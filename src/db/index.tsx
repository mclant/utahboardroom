import { createClient } from "@supabase/supabase-js"
// import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister"
import {
  QueryClient,
  QueryClientProvider as QueryClientProviderBase,
  useMutation,
  useQuery,
} from "@tanstack/react-query"
// import { persistQueryClient } from "@tanstack/react-query-persist-client"
// import queryString from "query-string"
// // import qs from "query-string"
// import toast from "react-hot-toast"

// import { formatDate } from "util/formatter"
// import { getRequest, postRequest, postRequestJson } from "../util/request"

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY
const supabase = createClient(supabaseUrl || "", supabaseKey || "")

const cacheTime = 1000 * 60 * 60 * 24 * 7 // 7 days

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 600000, // 10 minutes
      gcTime: cacheTime,
      retry: 1,
    },
  },
})

// const persister = createSyncStoragePersister({
//   storage: typeof window !== "undefined" ? window.localStorage : null,
// })

// persistQueryClient({
//   queryClient,
//   persister,
//   maxAge: cacheTime,
//   hydrateOptions: {},
//   dehydrateOptions: {
//     shouldDehydrateQuery: ({ queryKey }) => {
//       return queryKey.includes("quickTeeTimesDistanceMatrix")
//     },
//   },
// })

// export * from "./stripe"

// React Query context provider that wraps our app
export function QueryClientProvider(props: { children: React.ReactNode }) {
  return (
    <QueryClientProviderBase client={queryClient}>
      {props.children}
    </QueryClientProviderBase>
  )
}

export function useJoinWaitlist() {
  return useMutation({
    // @ts-ignore
    mutationFn: ({ fullName, email }) =>
      supabase
        .from("WaitlistUsers")
        .insert([{ full_name: fullName, email }])
        .select(),
  })
}

export function useSubmitFeedback() {
  return useMutation({
    // @ts-ignore
    mutationFn: ({ userId, feedback }) =>
      supabase
        .from("UserFeedback")
        .insert([{ user_id: userId, feedback }])
        .select(),
  })
}

export function useGetWaitlistUsers() {
  const queryKey = ["getWaitlistUsers"]
  const queryFn = () =>
    supabase.from("WaitlistUsers").select("*, UserFeedback(*)")
  return useQuery({ queryKey, queryFn })
}

// export function useGetWaitlistFeedback() {
//   const queryKey = ["getWaitlistFeedback"]
//   const queryFn = () =>
//     supabase.from("UserFeedback").select("*, WaitlistUsers(*)")
//   return useQuery({ queryKey, queryFn })
// }

export function useGetAuthUser() {
  const queryKey = ["getAuthUser"]
  const queryFn = () => supabase.auth.getUser()
  return useQuery({ queryKey, queryFn })
}

export function useGetClimber({ userId }: { userId: string }) {
  const queryKey = ["getClimber", userId]
  const queryFn = () =>
    supabase.from("Climber").select("*, Gyms(*)").eq("id", userId)
  return useQuery({ queryKey, queryFn, enabled: !!userId })
}

export function useSignUp() {
  return useMutation({
    // @ts-ignore
    mutationFn: ({ email, password }) =>
      supabase.auth.signUp({ email, password }),
  })
}

export function useCreateClimber() {
  return useMutation({
    // @ts-ignore
    mutationFn: ({ userId, firstName, lastName, email }) =>
      supabase
        .from("Climber")
        .insert([
          { id: userId, first_name: firstName, last_name: lastName, email },
        ])
        .select(),
  })
}

export function useGetBoardVotes() {
  const queryKey = ["getBoardVotes"]
  const queryFn = () => supabase.from("BoardVotes").select("*")
  return useQuery({ queryKey, queryFn })
}

export function useSubmitBoardVotes() {
  return useMutation({
    // @ts-ignore
    mutationFn: ({ email, votesMap }) =>
      supabase.from("BoardVotes").insert([{ email, votesMap }]).select(),
  })
}

export function useSignIn() {
  return useMutation({
    // @ts-ignore
    mutationFn: ({ email, password }) =>
      supabase.auth.signInWithPassword({ email, password }),
  })
}

export function useSignOut() {
  return useMutation({
    // @ts-ignore
    mutationFn: () => supabase.auth.signOut(),
  })
}

export function useSendResetPasswordEmail() {
  return useMutation({
    // @ts-ignore
    mutationFn: ({ email }) =>
      supabase.auth.resetPasswordForEmail(email, {
        redirectTo: import.meta.env.VITE_REDIRECT_URL,
      }),
  })
}

export function useResetPassword() {
  return useMutation({
    // @ts-ignore
    mutationFn: ({ newPassword }) =>
      supabase.auth.updateUser({
        password: newPassword,
      }),
  })
}

export function useGetGym({ gymId }: { gymId: string }) {
  const queryKey = ["getGym", gymId]
  const queryFn = () => supabase.from("Gyms").select("*").eq("id", gymId)
  return useQuery({ queryKey, queryFn, enabled: !!gymId })
}

export { supabase }
