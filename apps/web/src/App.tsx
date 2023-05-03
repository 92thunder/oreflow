import { ChakraProvider, VStack } from "@chakra-ui/react"
import { Header } from "./components/Header"
import { Main } from "./components/Main"
import { RouterProvider, createBrowserRouter } from "react-router-dom"
import { Settings } from "./components/Settings"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />
  },
  {
    path: "/settings",
    element: <Settings />
  }
])

const queryClient = new QueryClient()

export const App = () => {
  return (
    <ChakraProvider>
      <QueryClientProvider client={queryClient}>
        <VStack align="stretch" spacing="0" minHeight="100vh">
          <Header />
          <RouterProvider router={router} />
        </VStack>
      </QueryClientProvider>
    </ChakraProvider>
  )
}
