import { LinkIcon } from "@chakra-ui/icons";
import { Button, Container, Heading } from "@chakra-ui/react";
import { FC } from "react";

const CLIENT_ID = "dee99d42f2afdd9cc7ee"
const REDIRECT_URI = import.meta.env.PROD
	? 'https://oreflow.92thunder.dev/settings'
  : 'http://127.0.0.1:5173/settings'

export const Settings: FC = () => {
	const code = new URLSearchParams(window.location.search).get('code')
	console.log(code)
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