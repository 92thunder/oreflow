import { VStack } from "@chakra-ui/react"
import { TaskList } from "./TaskList"
import { TaskForm } from "./TaskForm"

export const TaskContainer = () => {
	return (
		<VStack spacing="5">
			<TaskForm />
			<TaskList />
		</VStack>
	)
}