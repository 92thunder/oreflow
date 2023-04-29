
import { AlertDialog, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button, Card, CardBody, Checkbox, HStack, IconButton, Spacer, Text, useDisclosure } from "@chakra-ui/react"
import { DeleteIcon } from "@chakra-ui/icons"
import { useSetAtom } from "jotai"
import { tasksAtom } from "../state"
import { FC, useRef } from "react"
import { Task } from "../types"

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

	return (
		<Card width="full" size="sm">
			<CardBody py="2">
				<HStack>
					<Checkbox checked={task.done} />
					<Text>{task.title}</Text>
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