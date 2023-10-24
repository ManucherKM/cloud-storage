import {
	AlertError,
	AlertMessage,
	DashboardNavBar,
	FileList,
	LayoutDashboard,
} from '@/components'
import { env } from '@/configuration/env'
import { ERoutes } from '@/configuration/routes'
import { useWindowFilesTransfer } from '@/hooks'
import { useFileStore, useStore } from '@/storage'
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
	const [error, setError] = useState<string>('')
	const [message, setMessage] = useState<string>('')
	const [validFiles, setValidFiles] = useState<IFile[]>([])
	const [showFiles, setShowFiles] = useState<IFile[]>([])
	const files = useFileStore(store => store.files)
	const sendFiles = useFileStore(store => store.sendFiles)
	const getFiles = useFileStore(store => store.getFiles)
	const addFileToTrash = useFileStore(store => store.addFileToTrash)
	const createArchive = useFileStore(store => store.createArchive)
	const setLoading = useStore(store => store.setLoading)
	const isTransferFilesOnWindow = useWindowFilesTransfer()
	const blockForSelection = useRef<HTMLDivElement | null>(null)

	async function changeFilesHandler(e: ChangeEvent<HTMLInputElement>) {
		setLoading(true)
		const selectedFiles = e.target.files

		if (!selectedFiles) {
			setLoading(false)
			return
		}

		const isSuccess = await sendFiles(selectedFiles)

		if (!isSuccess) {
			e.target.value = ''
			setError('Failed to send file.')
			setLoading(false)
			return
		}

		e.target.value = ''
		setError('')
		setLoading(false)
	}

	function errorTimeHandler() {
		setError('')
	}

	function messageTimeHandler() {
		setMessage('')
	}

	function closeFillAddHandler() {
		setIsTransferFiles(false)
	}

	async function changeFilesFileAddHandler(files: FileList | null) {
		setIsTransferFiles(false)
		setLoading(true)

		if (!files) {
			return
		}

		const isSuccess = await sendFiles(files)

		if (!isSuccess) {
			setError('Failed to send file.')
			setLoading(false)
			return
		}

		setError('')
		setLoading(false)
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
		setLoading(true)

		const id = await createArchive(idOfTheSelectedFiles)

		if (!id) {
			setError('Failed to share files.')
			setLoading(false)
			return
		}

		const url = CLIENT_URL + ERoutes.download + '/' + id

		const isSuccess = await writeTextIntoClipboard(url)

		if (!isSuccess) {
			setError('Failed to move link to clipboard.')
			setLoading(false)
			return
		}

		setMessage('Link copied to clipboard.')
		setLoading(false)
	}

	async function removeFilesHandler() {
		if (!idOfTheSelectedFiles.length) {
			return
		}
		setLoading(true)

		const isSuccess = await addFileToTrash(idOfTheSelectedFiles)

		if (!isSuccess) {
			setError('Failed to move files to Recycle Bin.')
			setLoading(false)
		}

		setLoading(false)
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
			setLoading(true)
			const isSuccess = await getFiles()

			if (!isSuccess) {
				setError('Failed to receive files.')
				setLoading(false)
				return
			}

			setLoading(false)
		}

		fetchFiles()
	}, [getFiles, setLoading])
	return (
		<>
			<AlertError error={error} onTimeUp={errorTimeHandler} />
			<AlertMessage message={message} onTimeUp={messageTimeHandler} />
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
