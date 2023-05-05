import { Button, Card, CardBody, FormControl, FormLabel, Heading, Input, VStack } from "@chakra-ui/react";
import { useSetAtom } from "jotai";
import { FC, useCallback, useState } from "react";
import { projectsAtom } from "../features/task/state";

export const CreateProject: FC = () => {
	const [title, setTitle] = useState('')

	const setProjects = useSetAtom(projectsAtom)

	const handleClickAdd = useCallback(() => {
		setProjects((projects) => [
			...projects,
			{
				id: crypto.randomUUID(),
				title
			}
		])
	}, [setProjects, title])

	return (
		<Card>
			<CardBody>
				<VStack gap="4" alignItems="start">
					<Heading as="h1" size="md">Create Project</Heading>
					<FormControl>
						<FormLabel>Title</FormLabel>
						<Input
							size="sm"
							placeholder="Project Title"
							value={title}
							onChange={(event) => setTitle(event.target.value)}
						/>
					</FormControl>
					<Button colorScheme="blue" size="sm" onClick={handleClickAdd}>Add</Button>
				</VStack>
			</CardBody>
		</Card>
	)
}