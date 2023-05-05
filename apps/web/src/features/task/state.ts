import { atomWithStorage } from 'jotai/utils'
import { Project, Task } from './types'

export const tasksAtom = atomWithStorage<Task[]>('tasks', [])

export const projectsAtom = atomWithStorage<Project[]>('projects', [])
