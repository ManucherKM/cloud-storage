import {
	DashboardNavBar,
	FileList,
	LayoutDashboard,
	TrashEmpty,
} from '@/components'
import { useLoader } from '@/hooks'
import { useFileStore, useNotificationsStore } from '@/storage'
import { IFile } from '@/storage/useFileStore/types'
import { getSearchedFiles, getTrashFiles } from '@/utils'
import { ChangeEvent, FC, useEffect, useRef, useState } from 'react'

export const TrashContent: FC = () => {
	const [search, setSearch] = useState<string>('')
	const [idOfTheSelectedFiles, setIdOfTheSelectedFiles] = useState<string[]>([])
	// Function to create a new error to show it to the user.
	const newError = useNotificationsStore(store => store.newError)
	const [validFiles, setValidFiles] = useState<IFile[]>([])
	const [showFiles, setShowFiles] = useState<IFile[]>([])
	const files = useFileStore(store => store.files)
	const getFiles = useFileStore(store => store.getFiles)
	const restoreFileFromTrash = useFileStore(store => store.restoreFileFromTrash)
	const removeFiles = useFileStore(store => store.removeFiles)

	// A function for showing Loader to the user when requesting an API.
	const loader = useLoader()

	const blockForSelection = useRef(null)

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

		const isSuccess = await loader(removeFiles, idOfTheSelectedFiles)

		if (!isSuccess) {
			newError('Failed to move files to Recycle Bin.')
		}
	}

	async function restoreFilesHandler() {
		if (!idOfTheSelectedFiles.length) {
			return
		}

		const isSuccess = await loader(restoreFileFromTrash, idOfTheSelectedFiles)

		if (!isSuccess) {
			newError('Failed to move files to Recycle Bin.')
		}
	}

	useEffect(() => {
		const searchedFiles = getSearchedFiles(search, validFiles)
		setShowFiles(searchedFiles)
	}, [search, validFiles])

	useEffect(() => {
		setShowFiles(validFiles)
	}, [validFiles])

	useEffect(() => {
		const filteredFiles = getTrashFiles(files)
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
