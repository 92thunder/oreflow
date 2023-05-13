import { ChakraProvider, VStack } from "@chakra-ui/react"
import { Header } from "./components/Header"
import { Main } from "./components/Main"
import { RouterProvider, createBrowserRouter } from "react-router-dom"
import { Settings } from "./components/Settings"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { DndContext } from "@dnd-kit/core"
import { useEffect } from "react"
import { getAuth, onAuthStateChanged } from "firebase/auth"
import { useSetAtom } from "jotai"
import { userAtom } from "./features/task/state"

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
	const setUser = useSetAtom(userAtom)
	useEffect(() => {
		const auth = getAuth()
		return onAuthStateChanged(auth, (user) => {
			setUser(user || null)
		})
	}, [setUser])

  return (
    <ChakraProvider>
      <QueryClientProvider client={queryClient}>
        <DndContext>
          <VStack align="stretch" spacing="0" minHeight="100vh">
            <Header />
            <RouterProvider router={router} />
          </VStack>
        </DndContext>
      </QueryClientProvider>
    </ChakraProvider>
  )
}
