import { Box, Container, Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react"
import { TaskContainer } from "../features/task/components/TaskContainer"

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
							<TaskContainer />
						</TabPanel>
					</TabPanels>
				</Tabs>
			</Container>
		</Box>
	)
}