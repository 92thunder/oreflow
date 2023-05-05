import { useSetAtom } from "jotai"
import { ChangeEvent, FC, FormEventHandler, useState } from "react"
import { tasksAtom } from "../state"
import { Input } from "@chakra-ui/react"

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
			{
				id: crypto.randomUUID(),
				title: draftTitle,
				done: false,
				projectId: projectId === 'all' ? null : projectId,
			},
			...tasks,
		]))
		setDraftTitle('')
	}

	return (
		<form onSubmit={handleSubmit} style={{ width: '100%' }}>
			<Input placeholder="+" bg="white" value={draftTitle} onChange={handleChange} />
		</form>
	)
}