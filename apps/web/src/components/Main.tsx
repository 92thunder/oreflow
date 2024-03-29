import { AddIcon } from "@chakra-ui/icons"
import { Box, Center, Container, Spinner, Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react"
import { DndContext, DragEndEvent, PointerSensor, useSensor, useSensors } from "@dnd-kit/core"
import { restrictToHorizontalAxis } from "@dnd-kit/modifiers"
import { SortableContext, arrayMove, horizontalListSortingStrategy, useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { doc, getFirestore, onSnapshot } from "firebase/firestore"
import { useAtom, useAtomValue, useSetAtom } from "jotai"
import { FC, useEffect, useState } from "react"
import { EditableProjectTitle } from "../features/task/components/EditableProjectTitle"
import { TaskContainer } from "../features/task/components/TaskContainer"
import { projectsAtom, tasksAtom, userAtom } from "../features/task/state"
import { Project, Task } from "../features/task/types"
import { app } from "../utils/firebase"
import { CreateProject } from "./CreateProject"

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
			sx={{ "touchAction": "none" }}
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
		<DndContext sensors={sensors} onDragEnd={handleDragEnd} modifiers={[restrictToHorizontalAxis]}>
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
	const [projects, setProjects] = useAtom(projectsAtom)
	const setTasks = useSetAtom(tasksAtom)

	const user = useAtomValue(userAtom)
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		if (user === null) {
			setLoading(false)
		}
	}, [user])

	useEffect(() => {
		if (!user) return
		const db = getFirestore(app)
		return onSnapshot((doc(db, "users", user.uid)), (doc) => {
			setLoading(false)
			if (doc.data()) {
				const tasks: Task[] = doc.data()?.tasks || []
				const projects: Project[] = doc.data()?.projects || []
				setProjects(projects)
				setTasks(tasks)
			}
		})
	}, [setProjects, setTasks, user])

	return (
		<Box py={4} bg="gray.50" as="main" flexGrow="1">
			<Container maxW="container.xl">
				{loading ? (
					<Center>
						<Spinner size="xl" />
					</Center>
				) : (
					<Tabs>
						<Box w="100%" overflowX="auto">
							<TabList minW="100%" w="max-content">
								<Tab>ALL</Tab>
								<ProjectTabs projects={projects} />
								<Tab><AddIcon color="gray" boxSize={3} /></Tab>
							</TabList>
						</Box>
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
				)}
			</Container>
		</Box>
	)
}