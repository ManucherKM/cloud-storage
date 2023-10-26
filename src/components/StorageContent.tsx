// Types
import type { IFile } from '@/storage/useFileStore/types'
import type { ChangeEvent, FC } from 'react'

// Components
import { DashboardNavBar, FileList, LayoutDashboard } from '@/components'
import { FileAdd } from 'kuui-react'

// Utils
import { env } from '@/configuration/env'
import { ERoutes } from '@/configuration/routes'
import { useLoader, useWindowFilesTransfer } from '@/hooks'
import { useFileStore, useNotificationsStore } from '@/storage'
import {
	getSearchedFiles,
	getValidFiles,
	writeTextIntoClipboard,
} from '@/utils'
import { useEffect, useRef, useState } from 'react'

// The URL where the web application is hosted.
const CLIENT_URL = env.get('CLIENT_URL').required().asString()

/**
 * Storage Page Content.
 *
 * @example
 * 	;<StorageContent />
 */
export const StorageContent: FC = () => {
	// State for the search string.
	const [search, setSearch] = useState<string>('')

	// State for selected files.
	const [idOfTheSelectedFiles, setIdOfTheSelectedFiles] = useState<string[]>([])

	// Function to create a new error to show it to the user.
	const newError = useNotificationsStore(store => store.newError)

	// Function to create a new message to show it to the user.
	const newMessage = useNotificationsStore(store => store.newMessage)

	// State for valid files.
	const [validFiles, setValidFiles] = useState<IFile[]>([])

	// Status for files that need to be shown to users
	const [showFiles, setShowFiles] = useState<IFile[]>([])

	// State for transporting files across the window.
	const [isTransfer, setIsTransfer] = useWindowFilesTransfer()

	// User files received from the API.
	const files = useFileStore(store => store.files)

	// Function for requesting API to add files.
	const sendFiles = useFileStore(store => store.sendFiles)

	// A function to query the API to retrieve user files.
	const getFiles = useFileStore(store => store.getFiles)

	// A function to call the API to add user files to the trash bin.
	const addFileToTrash = useFileStore(store => store.addFileToTrash)

	// A function for requesting an API to create an archive with files that the user wants to share.
	const createArchive = useFileStore(store => store.createArchive)

	// A function for showing Loader to the user when requesting an API.
	const loader = useLoader()

	// Link to the div tag in which the user files are rendered.
	const blockForSelection = useRef<HTMLDivElement | null>(null)

	// Function for adding files to the API by clicking on the input.
	async function changeFilesHandler(e: ChangeEvent<HTMLInputElement>) {
		// Selected files.
		const selectedFiles = e.target.files

		// If the selected files are not found.
		if (!selectedFiles) {
			// Prevent further execution of the function.
			return
		}

		// clear the input from the selected files.
		e.target.value = ''

		// We get the result of the request.
		const isSuccess = await loader(sendFiles, selectedFiles)

		// If the request result is unsuccessful.
		if (!isSuccess) {
			// Show the user an error message.
			newError('Failed to send file.')
		}
	}

	// A function that will work when downloading files via drag and drop.
	async function changeFilesDragAndDropHandler(files: FileList | null) {
		// If the files are not found. Prevent further execution of the function.
		if (!files) return

		// We get the result of the request.
		const isSuccess = await loader(sendFiles, files)

		// If the request result is unsuccessful.
		if (!isSuccess) {
			// Show the user an error message.
			newError('Failed to send file.')
		}
	}

	// A handler function that will be processed when the value of the search query changes.
	function searchHandler(e: ChangeEvent<HTMLInputElement> | undefined) {
		// If the event does not exist. Prevent further execution of the function.
		if (!e) return

		// Changing the state of the search bar.
		setSearch(e.target.value)
	}

	// A handler function that will be processed when the user clicks on the share button.
	async function shareFilesHandler() {
		// If the files have not been selected.
		if (!idOfTheSelectedFiles.length) {
			// Prevent further execution of the function.
			return
		}

		// We receive the identifier of the archive with files after sending a request to the API.
		const id = await loader(createArchive, idOfTheSelectedFiles)

		// If id does not exist.
		if (!id) {
			// We show the user text with an error.
			newError('Failed to share files.')

			// Prevent further execution of the function.
			return
		}

		// Create a URL for the archive.
		const url = CLIENT_URL + ERoutes.download + '/' + id

		// Add it to the user's buffer.
		const isSuccess = await writeTextIntoClipboard(url)

		// If you were unable to add a link to the buffer
		if (!isSuccess) {
			// We show the user text with an error.
			newError('Failed to move link to clipboard.')

			// Prevent further execution of the function.
			return
		}

		// We inform the user that the link has been copied.
		newMessage('Link copied to clipboard.')
	}

	// A handler function that is executed when the user presses the remove button.
	async function removeFilesHandler() {
		// If the selected files are not found.
		if (!idOfTheSelectedFiles.length) {
			// Prevent further execution of the function.
			return
		}

		// We send a request to the API.
		const isSuccess = await loader(addFileToTrash, idOfTheSelectedFiles)

		// If the response is unsuccessful.
		if (!isSuccess) {
			// We show the user text with an error.
			newError('Failed to move files to Recycle Bin.')
		}
	}

	function closeDragAndDrop() {
		setIsTransfer(false)
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
		const filteredFiles = getValidFiles(files)

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
			<LayoutDashboard title="Storage">
				{isTransfer ? (
					<FileAdd
						variant="dragAndDrop"
						onClose={closeDragAndDrop}
						onChangeFiles={changeFilesDragAndDropHandler}
					/>
				) : (
					<>
						<DashboardNavBar
							search={search}
							onSearch={searchHandler}
							share={true}
							onShare={shareFilesHandler}
							remove={true}
							onRemove={removeFilesHandler}
						/>
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
							<FileAdd
								onChange={changeFilesHandler}
								variant="area"
								fill="all"
								className="min-w-[100px] min-h-[100px]"
								multiple
							/>
						</div>
					</>
				)}
			</LayoutDashboard>
		</>
	)
}
