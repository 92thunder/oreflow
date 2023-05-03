import { Card, CardBody, Text, VStack } from "@chakra-ui/react"
import { useAtomValue } from "jotai"
import { tasksAtom } from "../state"
import { TaskCard } from "./TaskCard"
import { Octokit } from "@octokit/rest"
import { useEffect, useState } from "react"

export const TaskList = () => {
	const tasks = useAtomValue(tasksAtom)


	const [repos, setRepos] = useState<any>([])
	useEffect(() => {
		const octokit = new Octokit({ auth: localStorage.getItem('accessToken')})
		octokit.repos.listForAuthenticatedUser().then((response) => {
			setRepos(response.data
				.filter((repo) => repo.open_issues_count > 0))
		})
	}, [])


	return (
		<VStack align="stretch" spacing="3" width="100%">
			{tasks.map((task) => (
				<TaskCard task={task} key={task.id} />
			))}
			{repos.map((repo: any) => {
				console.log(repo.name)
				return <Card>
					<CardBody>{repo.name}
</CardBody>
					</Card>
			})}
		</VStack>
	)
}