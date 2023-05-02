import { Box, Container, HStack, Image, Link } from "@chakra-ui/react";
import logo from '../assets/oreflow.png';
import { SettingsIcon } from "@chakra-ui/icons";

export const Header = () => {
	return (
		<Box py="2" borderBottom="1px solid lightgray" as="header">
			<Container maxW="container.xl">
				<HStack justifyContent="space-between">
					<Link href="/">
						<Image src={logo} alt="logo" boxSize="32px" />
					</Link>
					<Link href="/settings">
						<SettingsIcon />
					</Link>
				</HStack>
			</Container>
		</Box>
	)
}
