import { useSetAtom } from "jotai"
import { ChangeEvent, FC, FormEventHandler, useState } from "react"
import { tasksAtom } from "../state"
import { HStack, IconButton, Input, Tooltip } from "@chakra-ui/react"
import { MinusIcon } from "@chakra-ui/icons"

type Props = {
	projectId: string
}

export const TaskForm: FC<Props> = ({ projectId }) => {
	const setTasks = useSetAtom(tasksAtom)
	const [draftTitle, setDraftTitle] = useState('')

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setDraftTitle(e.target.value)
	}

	const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
		e.preventDefault()
		setTasks((tasks) => ([
			...tasks,
			{
				id: crypto.randomUUID(),
				title: draftTitle,
				done: false,
				projectId: projectId === 'all' ? null : projectId,
				divider
			},
		]))
		setDraftTitle('')
	}

	const [divider, setDivider] = useState(false)

	return (
		<form onSubmit={handleSubmit} style={{ width: '100%' }}>
			<HStack>
				<Input placeholder="+" bg="white" value={draftTitle} onChange={handleChange} />
				<Tooltip label="as divider" placement="bottom-end">
					<IconButton
						onClick={() => setDivider(divider => !divider)}
						variant={divider ? "solid" : "ghost"}
						colorScheme={divider ? "blue" : "gray"}
						size="xs" aria-label="Enable divider"
						icon={<MinusIcon />}
					/>
				</Tooltip>
			</HStack>
		</form>
	)
}