import { Box, Center, Container, Spinner, Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react"
import { TaskContainer } from "../features/task/components/TaskContainer"
import { useAtom, useSetAtom } from "jotai"
import { projectsAtom, tasksAtom, userAtom } from "../features/task/state"
import { AddIcon } from "@chakra-ui/icons"
import { CreateProject } from "./CreateProject"
import { EditableProjectTitle } from "../features/task/components/EditableProjectTitle"
import { DndContext, DragEndEvent, PointerSensor, useSensor, useSensors } from "@dnd-kit/core"
import { SortableContext, arrayMove, horizontalListSortingStrategy, useSortable } from "@dnd-kit/sortable"
import { FC, useEffect, useState } from "react"
import { Project, Task } from "../features/task/types"
import { CSS } from "@dnd-kit/utilities"
import { restrictToHorizontalAxis } from "@dnd-kit/modifiers"
import { getAuth, onAuthStateChanged } from "firebase/auth"
import { SignIn } from "./SignIn"
import { doc, getFirestore, onSnapshot } from "firebase/firestore"
import { app } from "../utils/firebase"

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

	const [user, setUser] = useAtom(userAtom)
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const auth = getAuth()
		return onAuthStateChanged(auth, (user) => {
			setUser(user || null)
		})
	}, [setUser])

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
				) : !user ? (
					<SignIn />
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