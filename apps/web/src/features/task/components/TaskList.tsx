import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Divider, VStack } from "@chakra-ui/react"
import { TaskCard } from "./TaskCard"
import { Task } from "../types"
import { FC, useMemo } from "react"

type Props = {
	tasks: Task[]
}

export const TaskList: FC<Props> = ({ tasks }) => {
	const todoTasks = useMemo(() => tasks.filter((task) => !task.done), [tasks])
	const doneTasks = useMemo(() => tasks.filter((task) => task.done), [tasks])

	return (
		<VStack align="stretch" spacing="3" width="100%">
			{todoTasks.map((task) => (
				<TaskCard task={task} key={task.id} />
			))}
			<Divider />
			{doneTasks.length > 0 && (
				<Accordion allowMultiple>
					<AccordionItem>
						<AccordionButton>
							Done tasks
							<AccordionIcon />
						</AccordionButton>
						<AccordionPanel>
							{doneTasks.map((task) => (
								<TaskCard task={task} key={task.id} />
							))}
						</AccordionPanel>
					</AccordionItem>
				</Accordion>
			)}
		</VStack>
	)
}