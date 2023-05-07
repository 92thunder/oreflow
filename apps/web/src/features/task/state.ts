import { User } from 'firebase/auth'
import { Project, Task } from './types'
import { atom } from 'jotai'
import { updateProjects, updateTasks } from '../../utils/sync'
import equal from 'fast-deep-equal'

const _tasksAtom = atom<Task[]>([])
export const tasksAtom = atom(
  (get) => get(_tasksAtom),
  (get, set, update: (Task[] | ((tasks: Task[]) => Task[]))) => {
		const nextValue = typeof update === 'function' ? update(get(_tasksAtom)) : update	
		if (equal(get(_tasksAtom), nextValue)) return
    set(_tasksAtom, nextValue)
		const user = get(userAtom)
		if (user) {
			updateTasks(user.uid, nextValue)
		}
  }
)

const _projectsAtom = atom<Project[]>([])
export const projectsAtom = atom(
  (get) => get(_projectsAtom),
  (get, set, update: (Project[] | ((projects: Project[]) => Project[]))) => {
		const nextValue = typeof update === 'function' ? update(get(_projectsAtom)) : update	
		if (equal(get(_projectsAtom), nextValue)) return
    set(_projectsAtom, nextValue)
		const user = get(userAtom)
		if (user) {
			updateProjects(user.uid, nextValue)
		}
  }
)

export const userAtom = atom<User | null>(null)
