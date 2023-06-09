export type Task = {
	id: string;
	title: string;
	done: boolean;
	projectId: Project['id'] | null
	divider: boolean
}

export type Project = {
	id: string;
	title: string;
}
