import { VStack } from "@chakra-ui/react"
import { TaskList } from "./TaskList"
import { TaskForm } from "./TaskForm"
import { FC } from "react"
import { Project, Task } from "../types"
import { tasksAtom } from "../state"
import { useAtomValue } from "jotai"
import { useHasIssuesReposQuery } from "../queries/github"
import { GithubRepoTasks } from "./GithubRepoTasks"

type Props = {
	projectId: Project['id']
}

export const TaskContainer: FC<Props> = ({ projectId }) => {
	const allTasks = useAtomValue(tasksAtom)
	const tasks: Task[] = projectId === 'all'
		? allTasks
		: allTasks.filter((task) => task.projectId === projectId)

	const { data: repos } = useHasIssuesReposQuery()

	return (
		<VStack spacing="5">
			<TaskForm projectId={projectId} />
			<TaskList tasks={tasks}/>
			{projectId === 'all' && repos && repos.map((repo) => (
				<GithubRepoTasks repo={repo} key={repo.id} />
			))}
		</VStack>
	)
}