import { useSetAtom } from "jotai"
import { ChangeEvent, FC, FormEventHandler, useState } from "react"
import { tasksAtom } from "../state"
import { HStack, IconButton, Input, Tooltip } from "@chakra-ui/react"
import { MinusIcon } from "@chakra-ui/icons"
import { Task } from "../types"

type Props = {
	projectId: string
	insertPosition: 'last' | {
		previous: Task['id']
	}
	hideDivider?: boolean
}

export const TaskForm: FC<Props> = ({ projectId, insertPosition, hideDivider = true }) => {
	const setTasks = useSetAtom(tasksAtom)
	const [draftTitle, setDraftTitle] = useState('')

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setDraftTitle(e.target.value)
	}

	const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
		e.preventDefault()
		const newTask: Task = {
			id: crypto.randomUUID(),
			title: draftTitle,
			done: false,
			projectId: projectId === 'all' ? null : projectId,
			divider
		}
		setTasks((tasks) => {
			if (insertPosition === 'last') {
				return [
					...tasks,
					newTask
				]
			} else {
				const index = tasks.findIndex((task) => task.id === insertPosition.previous)
				const draftTasks = [...tasks]
				draftTasks.splice(index + 1, 0, newTask)
				return draftTasks
			}
		})
		setDraftTitle('')
	}

	const [divider, setDivider] = useState(false)

	return (
		<form onSubmit={handleSubmit} style={{ width: '100%' }}>
			<HStack>
				<Input placeholder="+" bg="white" value={draftTitle} onChange={handleChange} />
				{!hideDivider && (
					<Tooltip label="as divider" placement="bottom-end">
						<IconButton
							onClick={() => setDivider(divider => !divider)}
							variant={divider ? "solid" : "ghost"}
							colorScheme={divider ? "blue" : "gray"}
							size="xs" aria-label="Enable divider"
							icon={<MinusIcon />}
						/>
					</Tooltip>
				)}
			</HStack>
		</form>
	)
}