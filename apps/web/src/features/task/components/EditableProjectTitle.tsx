import { Editable, EditableInput, EditablePreview, HStack, IconButton, useEditableControls } from "@chakra-ui/react"
import { Project } from "../types"
import { FC, useCallback, useState } from "react"
import { useSetAtom } from "jotai"
import { projectsAtom } from "../state"
import { CheckIcon, CloseIcon, EditIcon } from "@chakra-ui/icons"

type Props = {
	project: Project
}

const EditableControls = () => {
	const { isEditing, getEditButtonProps, getSubmitButtonProps, getCancelButtonProps } = useEditableControls()

	return isEditing
		? (
			<>
				<IconButton
					size="xs"
					aria-label="Update project title"
					variant="ghost"
					icon={<CheckIcon />} 
					{...getSubmitButtonProps()}
				/>
				<IconButton
					size="xs"
					aria-label="Cancel edit project title"
					variant="ghost"
					icon={<CloseIcon />} 
					{...getCancelButtonProps()}
				/>
			</>
		)
		: (
			<IconButton
				size="xs"
				aria-label="Edit project title"
				variant="ghost"
				icon={<EditIcon/>} 
				{...getEditButtonProps()}
			/>
		)
}

export const EditableProjectTitle: FC<Props> = ({ project }) => {
	const setProjects = useSetAtom(projectsAtom)

	const updateProjectTitle = useCallback(
		({ id, title }: { id: string, title: string }) => {
			console.log(title)
			if (!title.trim()) return
			setProjects((projects) => projects.map((project) => {
				if (project.id === id) {
					return {
						...project,
						title
					}
				}
				return project
			}))
		}
	, [setProjects])

	const [draftTitle, setDraftTitle] = useState(project.title)

	return (
		<Editable
			value={draftTitle}
			minW="10"
			isPreviewFocusable={false}
			onCancel={() => {setDraftTitle(project.title)}}
			onSubmit={(value) => {
				updateProjectTitle({ id: project.id, title: value })}
			}
		>
			<HStack spacing={1}>
				<EditablePreview  sx={{cursor: 'pointer'}}/>
				<EditableInput
					onKeyDown={(event) => {
						event.stopPropagation()
					}}
					onChange={(event) => setDraftTitle(event.target.value)}
				/>
				<EditableControls />
			</HStack>
		</Editable>
	)
}