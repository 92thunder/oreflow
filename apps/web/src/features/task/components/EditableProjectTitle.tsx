import { AlertDialog, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Box, Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, Editable, EditableInput, EditablePreview, FormControl, FormLabel, HStack, IconButton, Tooltip, useDisclosure, useEditableControls } from "@chakra-ui/react"
import { Project } from "../types"
import { FC, useCallback, useRef, useState } from "react"
import { useSetAtom } from "jotai"
import { projectsAtom } from "../state"
import { CheckIcon, CloseIcon, DeleteIcon } from "@chakra-ui/icons"

const ProjectDrawer: FC<{ project: Project, isOpen: boolean, onClose: () => void }> = ({ project, isOpen, onClose }) => {
	const { isOpen: isOpenDeleteDialog, onOpen: onOpenDeleteDialog, onClose: onCloseDeleteDialog } = useDisclosure()

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
		<Drawer isOpen={isOpen} placement="right" onClose={onClose}>
			<DrawerOverlay />
			<DrawerContent>
				<DrawerCloseButton />
				<DrawerHeader>Edit Project</DrawerHeader>
				<DrawerBody>
					<FormControl>
						<FormLabel>
							Project Title
						</FormLabel>
					<Editable
						value={draftTitle}
						minW="10"
						onCancel={() => {setDraftTitle(project.title)}}
						onSubmit={(value) => {
							updateProjectTitle({ id: project.id, title: value })}
						}
					>
						<HStack spacing={1}>
							<EditablePreview _hover={{ background: 'gray.100' }} px="2"/>
							<EditableInput
								onKeyDown={(event) => {
									event.stopPropagation()
								}}
								onChange={(event) => setDraftTitle(event.target.value)}
							/>
							<EditableControls />
						</HStack>
					</Editable>
					</FormControl>
				</DrawerBody>
				<DrawerFooter>
					<IconButton
						size="sm"
						aria-label="Delete project"
						colorScheme="red"
						icon={<DeleteIcon />}
						onClick={onOpenDeleteDialog}
					/>
				</DrawerFooter>
				<DeleteDialog project={project} isOpen={isOpenDeleteDialog} onClose={onCloseDeleteDialog}/>
			</DrawerContent>
		</Drawer>
	)
}

const DeleteDialog: FC<{ project: Project, isOpen: boolean, onClose: () => void }> = ({ project, isOpen, onClose }) => {
	const cancelRef = useRef<HTMLButtonElement>(null)
	const setProjects = useSetAtom(projectsAtom)

	const handleClickDeleteButton = () => {
		setProjects((projects) => projects.filter((p) => p.id !== project.id))
		onClose()
	}

	return (
		<AlertDialog
			leastDestructiveRef={cancelRef}
			isOpen={isOpen}
			onClose={onClose}
		>
			<AlertDialogOverlay>
				<AlertDialogContent>
					<AlertDialogHeader>
						Delete project?
					</AlertDialogHeader>
					<AlertDialogFooter>
						<Button ref={cancelRef} onClick={onClose}>
							Cancel
						</Button>
						<Button onClick={handleClickDeleteButton} ml={3} colorScheme="red">
							Delete
						</Button>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialogOverlay>
		</AlertDialog>
	)
}



type Props = {
	project: Project
}

const EditableControls = () => {
	const { isEditing, getSubmitButtonProps, getCancelButtonProps } = useEditableControls()

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
		: null
}

export const EditableProjectTitle: FC<Props> = ({ project }) => {
	const { isOpen, onOpen, onClose } = useDisclosure()

	return (
		<>
			<Tooltip label="double click to edit" openDelay={500}>
				<Box onDoubleClick={onOpen}>
					{project.title}
				</Box>
			</Tooltip>
			<ProjectDrawer project={project} isOpen={isOpen} onClose={onClose} />
		</>
	)
}