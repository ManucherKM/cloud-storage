import { FC, useEffect, useState, ChangeEvent } from 'react'
import { IFile } from '@/storage/useFileStore/types'
import { useFileStore, useStore } from '@/storage'
import { List, Dashboard, DashboardNavBar } from '@/components'
import { Alert, FileAdd, FileItem, Input } from 'kuui-react'
import { getExtension, getValidFiles } from '@/utils'
import { useWindowFilesTransfer } from '@/hooks'
import { getSearchedFiles } from '@/utils/getSearchedFiles'

export const Storage: FC = () => {
	const [search, setSearch] = useState<string>('')
	const [isTransferFiles, setIsTransferFiles] = useState<boolean>(false)
	const [serverError, setServerError] = useState<string>('')
	const [validFiles, setValidFiles] = useState<IFile[]>([])
	const [showFiles, setShowFiles] = useState<IFile[]>([])
	const files = useFileStore(store => store.files)
	const sendFiles = useFileStore(store => store.sendFiles)
	const getFiles = useFileStore(store => store.getFiles)
	const setLoading = useStore(store => store.setLoading)
	const isTransferFilesOnWindow = useWindowFilesTransfer()

	async function changeFilesHandler(e: ChangeEvent<HTMLInputElement>) {
		setLoading(true)
		const selectedFiles = e.target.files

		if (!selectedFiles) {
			setLoading(false)
			return
		}

		const isSuccess = await sendFiles(selectedFiles)

		if (!isSuccess) {
			setServerError('Failed to send file.')
			setLoading(false)
			return
		}

		setServerError('')
		setLoading(false)
	}

	function serverErrorTimeHandler() {
		setServerError('')
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
			setServerError('Failed to send file.')
			setLoading(false)
			return
		}

		setServerError('')
		setLoading(false)
	}

	function searchHandler(e: ChangeEvent<HTMLInputElement> | undefined) {
		if (!e) {
			return
		}

		setSearch(e.target.value)
	}

	useEffect(() => {
		if (isTransferFilesOnWindow) {
			setIsTransferFiles(true)
		}
	}, [isTransferFilesOnWindow])

	useEffect(() => {
		const searchedFiles = getSearchedFiles(search, validFiles)
		setShowFiles(searchedFiles)
	}, [search])

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
				setServerError('Failed to receive files.')
				setLoading(false)
				return
			}

			setLoading(false)
		}

		fetchFiles()
	}, [])
	return (
		<>
			{serverError.length !== 0 && (
				<Alert
					text={serverError}
					variant="error"
					time={6}
					onTimeUp={serverErrorTimeHandler}
				/>
			)}
			<Dashboard title="Storage">
				{isTransferFiles ? (
					<FileAdd
						variant="dragAndDrop"
						onClose={closeFillAddHandler}
						onChangeFiles={changeFilesFileAddHandler}
					/>
				) : (
					<div className="w-full h-full">
						<DashboardNavBar search={search} onSearch={searchHandler} />
						<div className="w-full h-[90%] mb-14 overflow-auto p-5 grid grid-cols-8 auto-rows-min gap-4 tb_lg:grid-cols-6 tb_sm:grid-cols-4 ph_lg:grid-cols-2">
							<List
								arr={showFiles}
								callback={item => {
									const [name, extension] = getExtension(item.originalName)
									return (
										<FileItem
											key={item.id}
											name={name}
											extension={extension}
											onClick={() => console.log}
										/>
									)
								}}
							/>
							<FileAdd
								onChange={changeFilesHandler}
								variant="area"
								fill="all"
								multiple
							/>
						</div>
					</div>
				)}
			</Dashboard>
		</>
	)
}
