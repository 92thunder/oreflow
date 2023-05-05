import { Box, Container, Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react"
import { TaskContainer } from "../features/task/components/TaskContainer"
import { useAtomValue } from "jotai"
import { projectsAtom } from "../features/task/state"
import { AddIcon } from "@chakra-ui/icons"
import { CreateProject } from "./CreateProject"

export const Main = () => {
	const projects = useAtomValue(projectsAtom)

	return (
		<Box py={4} bg="gray.50" as="main" flexGrow="1">
			<Container maxW="container.xl">
				<Tabs>
					<TabList>
						<Tab>ALL</Tab>
						{projects.map((project) => (
							<Tab key={project.id}>{project.title}</Tab>
						))}
						<Tab><AddIcon boxSize={3} /></Tab>
					</TabList>
					<TabPanels>
						<TabPanel px="0">
							<TaskContainer projectId="all"/>
						</TabPanel>
						{projects.map((project) => (
							<TabPanel key={project.id} px="0">
								<TaskContainer projectId={project.id} />
							</TabPanel>
						))}
						<TabPanel px="0">
							<CreateProject />
						</TabPanel>
					</TabPanels>
				</Tabs>
			</Container>
		</Box>
	)
}