import { atom } from "jotai"
import { Project } from "../types"
import equal from "fast-deep-equal"
import { userAtom } from "./user"
import { updateProjects } from "../../../utils/sync"

const PROJECTS_KEY = 'projects'
const getInitialValue = (): Project[] => {
	const item = localStorage.getItem(PROJECTS_KEY)
	if (item !== null) {
		return JSON.parse(item)
	}
	return []
}
const baseAtom = atom<Project[]>(getInitialValue())
export const projectsAtom = atom(
	(get): Project[] => {
		const user = get(userAtom)
		if (!user) {
			return get(baseAtom)
		}
		return get(baseAtom)
	},
	(get, set, update: (Project[] | ((projects: Project[]) => Project[]))) => {
		const nextValue = typeof update === 'function' ? update(get(baseAtom)) : update	
		if (equal(get(baseAtom), nextValue)) return
		set(baseAtom, nextValue)
		const user = get(userAtom)
		if (user) {
			updateProjects(user.uid, nextValue)
		} else {
			localStorage.setItem(PROJECTS_KEY, JSON.stringify(nextValue))
		}
	}
)
