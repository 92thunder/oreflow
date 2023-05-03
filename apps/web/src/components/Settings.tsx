import { LinkIcon } from "@chakra-ui/icons";
import { Button, Container, Heading } from "@chakra-ui/react";
import { FC } from "react";
import { accessTokenRepository } from "../features/task/repositories/accessTokenRepository";

const CLIENT_ID = "dee99d42f2afdd9cc7ee"
const REDIRECT_URI = 'https://oreflow.onrender.com/callback'

export const Settings: FC = () => {
	const params = new URLSearchParams(window.location.search)
	const accessToken = params.get('access_token')
	if (accessToken) {
		accessTokenRepository.set(accessToken)
		window.location.search = ''
	}

	return (
		<Container maxW="container.xl" py={4}>
			<Heading as="h1" size="md" mb="4">Settings</Heading>
			<Button href={`https://github.com/login/oauth/authorize?scope=repo&client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}`} as="a">
				<LinkIcon fontSize="sm" mr="2" />
				Connect GitHub
			</Button>
	</Container>
	)
}