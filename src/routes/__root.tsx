import { Outlet, createRootRouteWithContext } from "@tanstack/react-router"

import type { QueryClient } from "@tanstack/react-query"
import { QueryClientProvider } from "@/db"
// import { TanStackRouterDevtools } from "@tanstack/react-router-devtools"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"

interface MyRouterContext {
  queryClient: QueryClient
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: () => (
    <QueryClientProvider>
      <Outlet />
      <ReactQueryDevtools buttonPosition="bottom-right" />
      {/* <TanStackRouterDevtools position="top-right" /> */}
    </QueryClientProvider>
  ),
})
