import { ChakraProvider, VStack } from "@chakra-ui/react"
import { Header } from "./components/Header"
import { Main } from "./components/Main"

export const App = () => {
  return (
    <ChakraProvider>
      <VStack align="stretch" spacing="0" minHeight="100vh">
        <Header />
        <Main />
      </VStack>
    </ChakraProvider>
  )
}
