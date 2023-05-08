import { doc, getDoc, getFirestore, setDoc, updateDoc } from "firebase/firestore";
import { app } from "./firebase";
import { Project, Task } from "../features/task/types";

const db = getFirestore(app)

export const getTasks = async (uid: string): Promise<Task[]> => {
	try {
		const docRef = doc(db, "users", uid)
		const docSnap = await getDoc(docRef)
		if (docSnap.exists()) {
			return docSnap.data().tasks
		} else {
			await setDoc(docRef, {
				tasks: [],
				projects: []
			})
			return []
		}
	} catch(e) {
		console.error(e)
	}
	return []
}

export const updateTasks = async (uid: string, tasks: Task[]) => {
	try {
		const docRef = doc(db, "users", uid)
		await updateDoc(docRef, {
			tasks,
		})
	} catch(e) {
		console.error(e)
	}
	return []
}

export const getProjects = async (uid: string): Promise<Project[]> => {
	try {
		const docRef = doc(db, "users", uid)
		const docSnap = await getDoc(docRef)
		if (docSnap.exists()) {
			return docSnap.data().projects
		} else {
			await setDoc(docRef, {
				tasks: [],
				projects: []
			})
			return []
		}
	} catch(e) {
		console.error(e)
	}
	return []
}

export const updateProjects = async (uid: string, projects: Project[]) => {
	try {
		const docRef = doc(db, "users", uid)
		await updateDoc(docRef, {
			projects,
		})
	} catch(e) {
		console.error(e)
	}
	return []
}
