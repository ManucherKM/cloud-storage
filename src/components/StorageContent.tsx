import { DashboardNavBar, FileList, LayoutDashboard } from '@/components'
import { env } from '@/configuration/env'
import { ERoutes } from '@/configuration/routes'
import { useLoader, useWindowFilesTransfer } from '@/hooks'
import { useFileStore, useNotificationsStore } from '@/storage'
import { IFile } from '@/storage/useFileStore/types'
import {
	getSearchedFiles,
	getValidFiles,
	writeTextIntoClipboard,
} from '@/utils'
import { FileAdd } from 'kuui-react'
import { ChangeEvent, FC, useEffect, useRef, useState } from 'react'

const CLIENT_URL = env.get('CLIENT_URL').required().asString()

export const StorageContent: FC = () => {
	const [search, setSearch] = useState<string>('')
	const [isTransferFiles, setIsTransferFiles] = useState<boolean>(false)
	const [idOfTheSelectedFiles, setIdOfTheSelectedFiles] = useState<string[]>([])
	// Function to create a new error to show it to the user.
	const newError = useNotificationsStore(store => store.newError)
	// Function to create a new message to show it to the user.
	const newMessage = useNotificationsStore(store => store.newMessage)
	const [validFiles, setValidFiles] = useState<IFile[]>([])
	const [showFiles, setShowFiles] = useState<IFile[]>([])
	const files = useFileStore(store => store.files)
	const sendFiles = useFileStore(store => store.sendFiles)
	const getFiles = useFileStore(store => store.getFiles)
	const addFileToTrash = useFileStore(store => store.addFileToTrash)
	const createArchive = useFileStore(store => store.createArchive)
	// A function for showing Loader to the user when requesting an API.
	const loader = useLoader()
	const isTransferFilesOnWindow = useWindowFilesTransfer()
	const blockForSelection = useRef<HTMLDivElement | null>(null)

	async function changeFilesHandler(e: ChangeEvent<HTMLInputElement>) {
		const selectedFiles = e.target.files

		if (!selectedFiles) {
			return
		}

		const isSuccess = await loader(sendFiles, selectedFiles)

		if (!isSuccess) {
			e.target.value = ''
			newError('Failed to send file.')
			return
		}

		e.target.value = ''
	}

	function closeFillAddHandler() {
		setIsTransferFiles(false)
	}

	async function changeFilesFileAddHandler(files: FileList | null) {
		setIsTransferFiles(false)

		if (!files) {
			return
		}

		const isSuccess = await loader(sendFiles, files)

		if (!isSuccess) {
			newError('Failed to send file.')

			return
		}
	}

	function searchHandler(e: ChangeEvent<HTMLInputElement> | undefined) {
		if (!e) {
			return
		}

		setSearch(e.target.value)
	}

	async function shareFilesHandler() {
		if (!idOfTheSelectedFiles.length) {
			return
		}

		const id = await loader(createArchive, idOfTheSelectedFiles)

		if (!id) {
			newError('Failed to share files.')

			return
		}

		const url = CLIENT_URL + ERoutes.download + '/' + id

		const isSuccess = await writeTextIntoClipboard(url)

		if (!isSuccess) {
			newError('Failed to move link to clipboard.')

			return
		}

		newMessage('Link copied to clipboard.')
	}

	async function removeFilesHandler() {
		if (!idOfTheSelectedFiles.length) {
			return
		}

		const isSuccess = await loader(addFileToTrash, idOfTheSelectedFiles)

		if (!isSuccess) {
			newError('Failed to move files to Recycle Bin.')
		}
	}

	useEffect(() => {
		if (isTransferFilesOnWindow) {
			setIsTransferFiles(true)
		}
	}, [isTransferFilesOnWindow])

	useEffect(() => {
		const searchedFiles = getSearchedFiles(search, validFiles)
		setShowFiles(searchedFiles)
	}, [search, validFiles])

	useEffect(() => {
		setShowFiles(validFiles)
	}, [validFiles])

	useEffect(() => {
		const filteredFiles = getValidFiles(files)
		setValidFiles(filteredFiles)
	}, [files])

	useEffect(() => {
		const fetchFiles = async () => {
			const isSuccess = await loader(getFiles)

			if (!isSuccess) {
				newError('Failed to receive files.')

				return
			}
		}

		fetchFiles()
	}, [getFiles])
	return (
		<>
			<LayoutDashboard title="Storage">
				{isTransferFiles ? (
					<FileAdd
						variant="dragAndDrop"
						onClose={closeFillAddHandler}
						onChangeFiles={changeFilesFileAddHandler}
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
