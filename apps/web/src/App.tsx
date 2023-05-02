import { ChakraProvider, VStack } from "@chakra-ui/react"
import { Header } from "./components/Header"
import { Main } from "./components/Main"
import { RouterProvider, createBrowserRouter } from "react-router-dom"
import { Settings } from "./components/Settings"

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

export const App = () => {
  return (
    <ChakraProvider>
      <VStack align="stretch" spacing="0" minHeight="100vh">
        <Header />
        <RouterProvider router={router} />
      </VStack>
    </ChakraProvider>
  )
}
