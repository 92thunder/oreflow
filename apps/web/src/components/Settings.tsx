import { Box, Button, Container, Heading, VStack } from "@chakra-ui/react";
import { FC } from "react";
import { accessTokenRepository } from "../features/task/repositories/accessTokenRepository";
import { getAuth, signOut } from "firebase/auth";

const auth = getAuth()

export const Settings: FC = () => {
	const params = new URLSearchParams(window.location.search)
	const accessToken = params.get('access_token')
	if (accessToken) {
		accessTokenRepository.set(accessToken)
		window.location.search = ''
	}

	const handleClickSignOutWithGoogle = () => {
		signOut(auth)
	}

	return (
		<Box>
			<Container maxW="container.xl" py={4}>
				<Heading as="h1" size="md" mb="4">Settings</Heading>
				<VStack align="start" spacing="5">
					<Button onClick={handleClickSignOutWithGoogle}>
						Sign out
					</Button>
				</VStack>
			</Container>
		</Box>
	)
}