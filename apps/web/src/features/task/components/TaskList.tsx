import { VStack } from "@chakra-ui/react"
import { useAtomValue } from "jotai"
import { tasksAtom } from "../state"
import { TaskCard } from "./TaskCard"

export const TaskList = () => {
	const tasks = useAtomValue(tasksAtom)

	return (
		<VStack align="stretch" spacing="3" width="100%">
			{tasks.map((task) => (
				<TaskCard task={task} key={task.id} />
			))}
		</VStack>
	)
}