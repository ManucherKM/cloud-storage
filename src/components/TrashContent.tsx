// Types
import type { IFile } from '@/storage/useFileStore/types'
import type { ChangeEvent, FC } from 'react'

// Utils
import { useLoader } from '@/hooks'
import { useFileStore, useNotificationsStore } from '@/storage'
import { getSearchedFiles, getTrashFiles } from '@/utils'
import { useEffect, useRef, useState } from 'react'

// Components
import {
	DashboardNavBar,
	FileList,
	LayoutDashboard,
	TrashEmpty,
} from '@/components'

/**
 * Trash Page Content.
 *
 * @example
 * 	;<TrashContent />
 */
export const TrashContent: FC = () => {
	// State for the search string.
	const [search, setSearch] = useState<string>('')

	// State for selected files.
	const [idOfTheSelectedFiles, setIdOfTheSelectedFiles] = useState<string[]>([])

	// Function to create a new error to show it to the user.
	const newError = useNotificationsStore(store => store.newError)

	// State for valid files.
	const [validFiles, setValidFiles] = useState<IFile[]>([])

	// Status for files that need to be shown to users
	const [showFiles, setShowFiles] = useState<IFile[]>([])

	// User files received from the API.
	const files = useFileStore(store => store.files)

	// A function to query the API to retrieve user files.
	const getFiles = useFileStore(store => store.getFiles)

	// Function to call the API to restore user files from the recycle bin.
	const restoreFileFromTrash = useFileStore(store => store.restoreFileFromTrash)

	// Function to call the API to completely delete user files.
	const removeFiles = useFileStore(store => store.removeFiles)

	// A function for showing Loader to the user when requesting an API.
	const loader = useLoader()

	// Link to the div tag in which the user files are rendered.
	const blockForSelection = useRef<HTMLDivElement | null>(null)

	// A handler function that will be processed when the value of the search query changes.
	function searchHandler(e: ChangeEvent<HTMLInputElement> | undefined) {
		// If the event does not exist. Prevent further execution of the function.
		if (!e) return

		// Changing the state of the search bar.
		setSearch(e.target.value)
	}

	// A handler function that is executed when the user presses the remove button.
	async function removeFilesHandler() {
		// If the selected files are not found.
		if (!idOfTheSelectedFiles.length) {
			// Prevent further execution of the function.
			return
		}

		// We send a request to the API.
		const isSuccess = await loader(removeFiles, idOfTheSelectedFiles)

		// If the response is unsuccessful.
		if (!isSuccess) {
			// We show the user text with an error.
			newError('Failed to move files to Recycle Bin.')
		}
	}

	// Handler function that is executed when the user presses the restore button.
	async function restoreFilesHandler() {
		// If the selected files are not found.
		if (!idOfTheSelectedFiles.length) {
			// Prevent further execution of the function.
			return
		}

		// We send a request to the API.
		const isSuccess = await loader(restoreFileFromTrash, idOfTheSelectedFiles)

		// If the response is unsuccessful.
		if (!isSuccess) {
			// We show the user text with an error.
			newError('Failed to move files to Recycle Bin.')
		}
	}

	// Every time a search query or valid files change.
	useEffect(() => {
		// We receive the files that the user is looking for.
		const searchedFiles = getSearchedFiles(search, validFiles)

		// Changing the state showFiles
		setShowFiles(searchedFiles)
	}, [search, validFiles])

	// Every time files in the storage are changed.
	useEffect(() => {
		// Filtering files.
		const filteredFiles = getTrashFiles(files)

		// Changing the state validFiles.
		setValidFiles(filteredFiles)
	}, [files])

	// On the first render, we call the callback.
	useEffect(() => {
		// Function for getting user files.
		const fetchFiles = async () => {
			// We make a request to the API.
			const isSuccess = await loader(getFiles)

			// If the request is unsuccessful.
			if (!isSuccess) {
				// We show the user text with an error.
				newError('Failed to receive files.')
			}
		}

		// We receive files from the API.
		fetchFiles()
	}, [getFiles, newError, loader])
	return (
		<>
			<LayoutDashboard title="Trash">
				<DashboardNavBar
					search={search}
					onSearch={searchHandler}
					remove={true}
					onRemove={removeFilesHandler}
					restore={true}
					onRestore={restoreFilesHandler}
				/>
				{showFiles.length ? (
					<div
						ref={blockForSelection}
						className="w-full h-[90%] mb-14 overflow-auto p-5 grid grid-cols-8 auto-rows-min gap-4 tb_lg:grid-cols-6 tb_sm:grid-cols-4 ph_lg:grid-cols-2"
					>
						<FileList
							files={showFiles}
							container={blockForSelection.current}
							selectedFiles={idOfTheSelectedFiles}
							setSelectedFiles={setIdOfTheSelectedFiles}
						/>
					</div>
				) : (
					<div className="w-full h-[90%] mb-14 overflow-auto p-5">
						<TrashEmpty className="h-full" />
					</div>
				)}
			</LayoutDashboard>
		</>
	)
}
