import { Box, Button, Container, Heading, Spinner, VStack } from "@chakra-ui/react";
import { FC } from "react";
import { accessTokenRepository } from "../features/task/repositories/accessTokenRepository";
import { getAuth, signOut } from "firebase/auth";
import { SignIn } from "./SignIn";
import { useAtomValue } from "jotai";
import { userAtom } from "../features/task/state";
import { useNavigate } from "react-router-dom";

const auth = getAuth()

export const Settings: FC = () => {
	const params = new URLSearchParams(window.location.search)
	const accessToken = params.get('access_token')
	if (accessToken) {
		accessTokenRepository.set(accessToken)
		window.location.search = ''
	}

	const navigate = useNavigate()

	const handleClickSignOutWithGoogle = () => {
		signOut(auth).then(() => {
			navigate('/')
		})
	}
	const user = useAtomValue(userAtom)

	return (
		<Box>
			<Container maxW="container.xl" py={4}>
				<Heading as="h1" size="md" mb="4">Settings</Heading>
				<VStack align="start" spacing="5">
					{user ? 
						<Button onClick={handleClickSignOutWithGoogle}>
							Sign out
						</Button>
					: user === null
					? <SignIn />
					: <Spinner size="xl" />
					}
				</VStack>
			</Container>
		</Box>
	)
}