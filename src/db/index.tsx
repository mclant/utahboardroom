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

// const cacheTime = 1000 * 60 * 60 * 24 * 7 // 7 days

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 600000, // 10 minutes
      // cacheTime: cacheTime,
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

export function useGetNumWaitlistUsers() {
  const queryKey = ["getNumWaitlistUsers"]
  const queryFn = () => supabase.from("WaitlistUsers").select("*")
  return useQuery({ queryKey, queryFn })
}

export { supabase }
