import { atom } from "jotai"
import { Task } from "../types"
import equal from "fast-deep-equal"
import { updateTasks } from "../../../utils/sync"
import { userAtom } from "./user"

const TASKS_KEY = 'tasks'
const getInitialValue = (): Task[] => {
	const item = localStorage.getItem(TASKS_KEY)
	if (item !== null) {
		return JSON.parse(item)
	}
	return []
}
const baseAtom = atom<Task[]>(getInitialValue())
export const tasksAtom = atom(
	(get): Task[] => {
		const user = get(userAtom)
		if (!user) {
			return get(baseAtom)
		}
		return get(baseAtom)
	},
	(get, set, update: (Task[] | ((tasks: Task[]) => Task[]))) => {
		const nextValue = typeof update === 'function' ? update(get(baseAtom)) : update	
		if (equal(get(baseAtom), nextValue)) return
		set(baseAtom, nextValue)
		const user = get(userAtom)
		if (user) {
			updateTasks(user.uid, nextValue)
		} else {
			localStorage.setItem(TASKS_KEY, JSON.stringify(nextValue))
		}
	}
)