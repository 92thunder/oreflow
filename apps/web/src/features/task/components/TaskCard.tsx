
import { AlertDialog, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button, Card, CardBody, Checkbox, Divider, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, Editable, EditableInput, EditablePreview, HStack, IconButton, Select, Spacer, VStack, useDisclosure } from "@chakra-ui/react"
import { DeleteIcon } from "@chakra-ui/icons"
import { useAtomValue, useSetAtom } from "jotai"
import { projectsAtom, tasksAtom } from "../state"
import { ChangeEventHandler, FC, useCallback, useRef, useState } from "react"
import { Task } from "../types"
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { TaskForm } from "./TaskForm"

const TaskDrawer: FC<{ task: Task, isOpen: boolean, onClose: () => void }> = ({ task, isOpen, onClose }) => {
	const projects = useAtomValue(projectsAtom)
	const setTasks = useSetAtom(tasksAtom)
	const handleChangeProject: ChangeEventHandler<HTMLSelectElement> = (event) => {
		setTasks((tasks) => tasks.map((t) => {
			if (t.id === task.id) {
				return {
					...t,
					projectId: event.target.value === 'none'
						? null
						: event.target.value
				}
			}
			return t
		}))
	}
	const { isOpen: isOpenDeleteDialog, onOpen: onOpenDeleteDialog, onClose: onCloseDeleteDialog } = useDisclosure()

	return (
		<Drawer isOpen={isOpen} placement="right" onClose={onClose}>
			<DrawerOverlay />
			<DrawerContent>
				<DrawerCloseButton />
				<DrawerHeader>Edit task</DrawerHeader>
				<DrawerBody>
					<Select defaultValue={task.projectId ? task.projectId : ''} placeholder="Select project" onChange={handleChangeProject}>
						<option value="none">none</option>
						{projects.map((project) => (
							<option key={project.id} value={project.id}>{project.title}</option>
						))}
					</Select>
				</DrawerBody>
				<DrawerFooter>
					<IconButton
						size="sm"
						aria-label="Delete task"
						colorScheme="red"
						icon={<DeleteIcon />}
						onClick={onOpenDeleteDialog}
					/>
				</DrawerFooter>
				<DeleteDialog task={task} isOpen={isOpenDeleteDialog} onClose={onCloseDeleteDialog}/>
			</DrawerContent>
		</Drawer>
	)
}

const DeleteDialog: FC<{ task: Task, isOpen: boolean, onClose: () => void }> = ({ task, isOpen, onClose }) => {
	const cancelRef = useRef<HTMLButtonElement>(null)
	const setTasks = useSetAtom(tasksAtom)

	const handleClickDeleteButton = () => {
		setTasks((tasks) => tasks.filter((t) => t.id !== task.id))
		onClose()
	}

	return (
		<AlertDialog
			leastDestructiveRef={cancelRef}
			isOpen={isOpen}
			onClose={onClose}
		>
			<AlertDialogOverlay>
				<AlertDialogContent>
					<AlertDialogHeader>
						Delete Task?
					</AlertDialogHeader>
					<AlertDialogFooter>
						<Button ref={cancelRef} onClick={onClose}>
							Cancel
						</Button>
						<Button onClick={handleClickDeleteButton} ml={3} colorScheme="red">
							Delete
						</Button>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialogOverlay>
		</AlertDialog>
	)
}

const TaskDivider: FC<{ task: Task }> = ({ task }) => {
	const setTasks = useSetAtom(tasksAtom)

	const {
		attributes,
		listeners,
		setNodeRef,
		transform,
		transition
	} = useSortable({ id: task.id })
	const style = {
		transform: CSS.Transform.toString(transform),
		transition,
	}

	const [draftTitle, setDraftTitle] = useState(task.title)

	const updateTaskTitle = useCallback(
		({ id, title }: { id: string, title: string }) => {
		if (task.divider && !title) {
			setTasks((tasks) => tasks.filter((t) => t.id !== task.id))
		}
		if (!title.trim()) return
		setTasks((tasks) => tasks.map((t) => {
			if (t.id === id) {
				return {
					...t,
					title: draftTitle
				}
			}
			return t
		}))
	}, [draftTitle, setTasks, task.divider, task.id])

	const [visibleTaskForm, setVisibleTaskForm] = useState(false)

	return (
		<VStack align="stretch"
			ref={setNodeRef}
			style={style}
			{...attributes}
			{...listeners}
			sx={{ "touchAction": "none" }}
		>
			<HStack onClick={() => setVisibleTaskForm(!visibleTaskForm)}>
				<Divider/>
				<Editable
					value={draftTitle}
					onCancel={() => { setDraftTitle(task.title) }}
					onSubmit={(value) => updateTaskTitle({ id: task.id, title: value })}
					onChange={(draftValue) => setDraftTitle(draftValue)}
				>
					<EditablePreview fontSize={14} />
					<EditableInput />
				</Editable>
				<Divider />
			</HStack>
			{visibleTaskForm && <TaskForm projectId={task.projectId || 'all'} insertPosition={{ previous: task.id }} hideDivider />}
		</VStack>
	)
}

export const TaskCardItem: FC<{ task: Task }> = ({ task }) => {
	const setTasks = useSetAtom(tasksAtom)
	const { isOpen: isOpenDrawer, onOpen: onOpenDrawer, onClose: onCloseDrawer } = useDisclosure()

	const handleChangeDone = () => {
		setTasks((tasks) => tasks.map((t) => {
			if (t.id === task.id) {
				return {
					...t,
					done: !t.done
				}
			}
			return t
		}))
	}

	const [draftTitle, setDraftTitle] = useState(task.title)
	const updateTaskTitle = useCallback(
		({ id, title }: { id: string, title: string }) => {
		if (!title.trim()) return
		setTasks((tasks) => tasks.map((t) => {
			if (t.id === id) {
				return {
					...t,
					title: draftTitle
				}
			}
			return t
		}))
	}, [draftTitle, setTasks])

	const {
		attributes,
		listeners,
		setNodeRef,
		transform,
		transition
	} = useSortable({ id: task.id })

	const style = {
		transform: CSS.Transform.toString(transform),
		transition,
	}
	
	return (
		<>
			<Card width="full" size="sm" bgColor={task.done ? "gray.300": "white"}
				ref={setNodeRef}
				style={style}
				{...attributes}
				{...listeners}
				onClick={onOpenDrawer}
			>
				<CardBody py="1">
					<HStack>
						<Checkbox isChecked={task.done} onChange={handleChangeDone} />
						<Editable
							value={draftTitle}
							onCancel={() => { setDraftTitle(task.title) }}
							onSubmit={(value) => updateTaskTitle({ id: task.id, title: value })}
							onChange={(draftValue) => setDraftTitle(draftValue)}
							width="full"
						>
							<EditablePreview fontSize={14}/>
							<EditableInput />
						</Editable>
						<Spacer />
					</HStack>
				</CardBody>
			</Card>
			<TaskDrawer task={task} isOpen={isOpenDrawer} onClose={onCloseDrawer} />
		</>
	)
}

export const TaskCard: FC<{ task: Task }> = ({ task }) => {
	if (task.divider) {
		return <TaskDivider task={task} />
	} else {
		return <TaskCardItem task={task} />
	}
}