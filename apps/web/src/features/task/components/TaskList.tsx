import { VStack } from "@chakra-ui/react"
import { TaskCard } from "./TaskCard"
import { Task } from "../types"
import { FC } from "react"

type Props = {
	tasks: Task[]
}

export const TaskList: FC<Props> = ({ tasks }) => {

	return (
		<VStack align="stretch" spacing="3" width="100%">
			{tasks.map((task) => (
				<TaskCard task={task} key={task.id} />
			))}
		</VStack>
	)
}