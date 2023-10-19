import { AlertError, Dashboard, DashboardNavBar, FileList } from '@/components'
import { TrashEmpty } from '@/components/TrashEmpty'
import { useFileStore, useStore } from '@/storage'
import { IFile } from '@/storage/useFileStore/types'
import { getSearchedFiles, getTrashFiles } from '@/utils'
import { ChangeEvent, FC, useEffect, useRef, useState } from 'react'

export const TrashContent: FC = () => {
	const [search, setSearch] = useState<string>('')
	const [idOfTheSelectedFiles, setIdOfTheSelectedFiles] = useState<string[]>([])
	const [error, setError] = useState<string>('')
	const [validFiles, setValidFiles] = useState<IFile[]>([])
	const [showFiles, setShowFiles] = useState<IFile[]>([])
	const files = useFileStore(store => store.files)
	const getFiles = useFileStore(store => store.getFiles)
	const restoreFileFromTrash = useFileStore(store => store.restoreFileFromTrash)
	const removeFile = useFileStore(store => store.removeFile)
	const setLoading = useStore(store => store.setLoading)
	const blockForSelection = useRef(null)

	function errorTimeHandler() {
		setError('')
	}

	function searchHandler(e: ChangeEvent<HTMLInputElement> | undefined) {
		if (!e) {
			return
		}

		setSearch(e.target.value)
	}

	async function removeFilesHandler() {
		if (!idOfTheSelectedFiles.length) {
			return
		}
		setLoading(true)

		const isSuccess = await removeFile(idOfTheSelectedFiles)

		if (!isSuccess) {
			setError('Failed to move files to Recycle Bin.')
			setLoading(false)
		}

		setLoading(false)
	}

	async function restoreFilesHandler() {
		if (!idOfTheSelectedFiles.length) {
			return
		}
		setLoading(true)

		const isSuccess = await restoreFileFromTrash(idOfTheSelectedFiles)

		if (!isSuccess) {
			setError('Failed to move files to Recycle Bin.')
			setLoading(false)
		}

		setLoading(false)
	}

	useEffect(() => {
		const searchedFiles = getSearchedFiles(search, validFiles)
		setShowFiles(searchedFiles)
	}, [search])

	useEffect(() => {
		setShowFiles(validFiles)
	}, [validFiles])

	useEffect(() => {
		const filteredFiles = getTrashFiles(files)
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
	}, [])
	return (
		<>
			<AlertError error={error} onTimeUp={errorTimeHandler} />
			<Dashboard title="Trash">
				<DashboardNavBar
					search={search}
					onSearch={searchHandler}
					remove={true}
					onRemove={removeFilesHandler}
					restore={true}
					onRestore={restoreFilesHandler}
				/>

				<div className="w-full h-[90%] mb-14 overflow-auto p-5">
					{showFiles.length ? (
						<div
							ref={blockForSelection}
							className="grid grid-cols-8 auto-rows-min gap-4 tb_lg:grid-cols-6 tb_sm:grid-cols-4 ph_lg:grid-cols-2"
						>
							<FileList
								files={showFiles}
								container={blockForSelection.current}
								selectedFiles={idOfTheSelectedFiles}
								setSelectedFiles={setIdOfTheSelectedFiles}
							/>
						</div>
					) : (
						<TrashEmpty className="h-full" />
					)}
				</div>
			</Dashboard>
		</>
	)
}
