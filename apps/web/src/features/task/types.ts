export type Task = {
	id: string;
	title: string;
	done: boolean;
	projectId: Project['id'] | null
}

export type Project = {
	id: string;
	title: string;
}
