import { VStack } from "@chakra-ui/react"
import { TaskList } from "./TaskList"
import { TaskForm } from "./TaskForm"
import { FC } from "react"
import { Project, Task } from "../types"
import { tasksAtom } from "../state"
import { useAtomValue } from "jotai"

type Props = {
	projectId: Project['id']
}

export const TaskContainer: FC<Props> = ({ projectId }) => {
	const allTasks = useAtomValue(tasksAtom)
	const tasks: Task[] = projectId === 'all'
		? allTasks
		: allTasks.filter((task) => task.projectId === projectId)

	return (
		<VStack spacing="5">
			<TaskForm projectId={projectId} insertPosition="last" hideDivider={projectId !== 'all'} />
			<TaskList tasks={tasks}/>
		</VStack>
	)
}