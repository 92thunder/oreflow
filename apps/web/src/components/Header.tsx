import { Box, Container, Image, Link } from "@chakra-ui/react";
import logo from '../assets/oreflow.png';

export const Header = () => {
	return (
		<Box py="2" borderBottom="1px solid lightgray" as="header">
			<Container maxW="container.xl">
				<Link>
					<Image src={logo} alt="logo" boxSize="40px" />
				</Link>
			</Container>
		</Box>
	)
}
