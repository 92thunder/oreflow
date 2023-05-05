import { Box, Container, Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react"
import { TaskContainer } from "../features/task/components/TaskContainer"
import { useAtomValue, useSetAtom } from "jotai"
import { projectsAtom } from "../features/task/state"
import { AddIcon } from "@chakra-ui/icons"
import { CreateProject } from "./CreateProject"
import { EditableProjectTitle } from "../features/task/components/EditableProjectTitle"
import { DndContext, DragEndEvent, PointerSensor, useSensor, useSensors } from "@dnd-kit/core"
import { SortableContext, arrayMove, horizontalListSortingStrategy, useSortable } from "@dnd-kit/sortable"
import { FC } from "react"
import { Project } from "../features/task/types"
import { CSS } from "@dnd-kit/utilities"


const ProjectTab: FC<{ project: Project }> = ({ project }) => {
	const {
		attributes,
		listeners,
		setNodeRef,
		transform,
		transition
	} = useSortable({ id: project.id })

	const style = {
		transform: CSS.Transform.toString(transform),
		transition,
	}

	return (
		<Tab ref={setNodeRef} style={style}
			{...attributes}
			{...listeners}
		>
			<EditableProjectTitle project={project} />
		</Tab>
	)
}

const ProjectTabs: FC<{ projects: Project[] }> = ({ projects }) => {
	const setProjects = useSetAtom(projectsAtom)

	const handleDragEnd = (event: DragEndEvent) => {
		const { active, over } = event
		if (over && active.id !== over.id) {
			setProjects((projects) => {
				const oldIndex = projects.findIndex((project) => project.id === active.id)
				const newIndex = projects.findIndex((project) => project.id === over.id)
				return arrayMove(projects, oldIndex, newIndex)
			})
		}
	}

	const sensors = useSensors(
		useSensor(PointerSensor, {
			activationConstraint: {
				distance: 5,
			}
		}),
	)

	return (
		<DndContext sensors={sensors} onDragEnd={handleDragEnd}>
			<SortableContext
				items={projects}
				strategy={horizontalListSortingStrategy}
			>
				{projects.map((project) => (
						<ProjectTab key={project.id} project={project} />
				))}
			</SortableContext>
		</DndContext>
	)
}

export const Main = () => {
	const projects = useAtomValue(projectsAtom)

	return (
		<Box py={4} bg="gray.50" as="main" flexGrow="1">
			<Container maxW="container.xl">
				<Tabs>
					<TabList>
						<Tab>ALL</Tab>
						<ProjectTabs projects={projects} />
						<Tab><AddIcon color="gray" boxSize={3} /></Tab>
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