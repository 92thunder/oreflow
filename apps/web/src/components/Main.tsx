import { Box, Card, CardBody, Checkbox, Container, HStack, Input, Tab, TabList, TabPanel, TabPanels, Tabs, Text, VStack } from "@chakra-ui/react"

export const Main = () => {
	return (
		<Box py={4} bg="gray.50" as="main" flexGrow="1">
			<Container maxW="container.xl">
				<Tabs>
					<TabList>
						<Tab>ALL</Tab>
					</TabList>
					<TabPanels>
						<TabPanel px="0">
							<VStack>
								<Input placeholder="+" bg="white" />
								<Card width="full" size="sm">
									<CardBody>
										<HStack>
											<Checkbox />
											<Text>test</Text>
										</HStack>
									</CardBody>
								</Card>
							</VStack>
						</TabPanel>
					</TabPanels>
				</Tabs>
			</Container>
		</Box>
	)
}