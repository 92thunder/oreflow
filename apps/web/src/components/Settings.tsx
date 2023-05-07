import { LinkIcon } from "@chakra-ui/icons";
import { Box, Button, Container, Heading, VStack } from "@chakra-ui/react";
import { FC } from "react";
import { accessTokenRepository } from "../features/task/repositories/accessTokenRepository";
import { getAuth, signOut } from "firebase/auth";

const CLIENT_ID = "dee99d42f2afdd9cc7ee"
const REDIRECT_URI = 'https://oreflow.onrender.com/callback'

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
					<Button href={`https://github.com/login/oauth/authorize?scope=repo&client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}`} as="a">
						<LinkIcon fontSize="sm" mr="2" />
						Connect GitHub
					</Button>
					<Button onClick={handleClickSignOutWithGoogle}>
						<LinkIcon fontSize="sm" mr="2" />
						Sign out with Google
					</Button>
				</VStack>
			</Container>
		</Box>
	)
}