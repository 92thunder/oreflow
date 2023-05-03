import { VStack } from "@chakra-ui/react"
import { useAtomValue } from "jotai"
import { tasksAtom } from "../state"
import { TaskCard } from "./TaskCard"
import { useHasIssuesReposQuery } from "../queries/github"
import { GithubRepoTasks } from "./GithubRepoTasks"
import { accessTokenRepository } from "../repositories/accessTokenRepository"

export const TaskList = () => {
	const tasks = useAtomValue(tasksAtom)

	const { data: repos } = useHasIssuesReposQuery()
	console.log(accessTokenRepository.get())

	return (
		<VStack align="stretch" spacing="3" width="100%">
			{tasks.map((task) => (
				<TaskCard task={task} key={task.id} />
			))}
			{repos && repos.map((repo) => (
				<GithubRepoTasks repo={repo} key={repo.id} />
			))}
		</VStack>
	)
}