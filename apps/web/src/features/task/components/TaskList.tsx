import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Divider, VStack } from "@chakra-ui/react"
import { TaskCard } from "./TaskCard"
import { Task } from "../types"
import { FC, useMemo } from "react"
import { SortableContext, arrayMove, verticalListSortingStrategy } from "@dnd-kit/sortable"
import { DndContext, DragEndEvent, PointerSensor, useSensor, useSensors } from "@dnd-kit/core"
import { tasksAtom } from "../state"
import { useSetAtom } from "jotai"
import { restrictToVerticalAxis } from "@dnd-kit/modifiers"

type Props = {
	tasks: Task[]
}

export const TaskList: FC<Props> = ({ tasks }) => {
	const setTasks = useSetAtom(tasksAtom)
	const todoTasks = useMemo(() => tasks.filter((task) => !task.done), [tasks])
	const doneTasks = useMemo(() => tasks.filter((task) => task.done), [tasks])

	const sensors = useSensors(
		useSensor(PointerSensor, {
			activationConstraint: {
				distance: 5,
			}
		}),
	)
	const handleDragEnd = (event: DragEndEvent) => {
		const { active, over } = event
		if (over && active.id !== over.id) {
			setTasks((tasks) => {
				const oldIndex = tasks.findIndex((task) => task.id === active.id)
				const newIndex = tasks.findIndex((task) => task.id === over.id)
				return arrayMove(tasks, oldIndex, newIndex)
			})
		}
	}

	return (
		<DndContext
			sensors={sensors}
			onDragEnd={handleDragEnd}
			modifiers={[restrictToVerticalAxis]}
		>
			<SortableContext
				items={tasks}
				strategy={verticalListSortingStrategy}
			>
				<VStack align="stretch" spacing="3" width="100%">
					{todoTasks.map((task) => (
						<TaskCard task={task} key={task.id} />
					))}
					{doneTasks.length > 0 && (
						<>
							<Divider />
							<Accordion allowMultiple>
								<AccordionItem>
									<AccordionButton>
										Done tasks
										<AccordionIcon />
									</AccordionButton>
									<AccordionPanel>
										<VStack spacing="3" width="100%">
											{doneTasks.map((task) => (
												<TaskCard task={task} key={task.id} />
											))}
										</VStack>
									</AccordionPanel>
								</AccordionItem>
							</Accordion>
						</>
					)}
				</VStack>
			</SortableContext>
		</DndContext>
	)
}