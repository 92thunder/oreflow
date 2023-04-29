import { useSetAtom } from "jotai"
import { ChangeEvent, FormEventHandler, useState } from "react"
import { tasksAtom } from "../state"
import { Input } from "@chakra-ui/react"

export const TaskForm = () => {
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