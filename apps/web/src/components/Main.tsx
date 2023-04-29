import { Box, Container, Input, VStack } from "@chakra-ui/react"

export const Main = () => {
	return (
		<Box py={4} bg="gray.50" as="main" flexGrow="1">
			<Container maxW="container.xl">
				<VStack>
					<Input placeholder="+" bg="white" />
				</VStack>
			</Container>
		</Box>
	)
}