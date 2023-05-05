
import { AlertDialog, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button, Card, CardBody, Checkbox, Divider, Editable, EditableInput, EditablePreview, HStack, IconButton, Spacer, Text, list, useDisclosure } from "@chakra-ui/react"
import { DeleteIcon } from "@chakra-ui/icons"
import { useSetAtom } from "jotai"
import { tasksAtom } from "../state"
import { FC, useCallback, useRef, useState } from "react"
import { Task } from "../types"
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"

export const TaskCard: FC<{ task: Task }> = ({ task }) => {
	const setTasks = useSetAtom(tasksAtom)
	const { isOpen, onOpen, onClose } = useDisclosure()

	const DeleteDialog: FC<{ task: Task }> = ({ task }) => {
		const cancelRef = useRef<HTMLButtonElement>(null)

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

	if (task.divider) {
		return (
			<HStack
				ref={setNodeRef}
				style={style}
				{...attributes}
				{...listeners}
			>
				<Divider />
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

		)
	}


	return (
		<Card width="full" size="sm" bgColor={task.done ? "gray.300": "white"}
			ref={setNodeRef}
			style={style}
			{...attributes}
			{...listeners}
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
					<IconButton
						size="sm"
						aria-label="Delete task"
						variant="ghost"
						icon={<DeleteIcon color="gray" />}
						onClick={onOpen}
					/>
					<DeleteDialog task={task} />
				</HStack>
			</CardBody>
		</Card>
	)
}