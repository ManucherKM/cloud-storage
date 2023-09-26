import { FC, useEffect, useState, ChangeEvent } from 'react'
import { Menu } from '@/components'
import { IFile } from '@/storage/useFileStore/types'
import { useFileStore, useStore } from '@/storage'
import { List, Dashboard } from '@/components'
import { Alert, FileAdd, FileItem } from 'kuui-react'
import { getExtension, getValidFiles } from '@/utils'

export const Storage: FC = () => {
	const [serverError, setServerError] = useState<string>('')
	const [showFiles, setShowFiles] = useState<IFile[]>([])
	const files = useFileStore(store => store.files)
	const sendFiles = useFileStore(store => store.sendFiles)
	const getFiles = useFileStore(store => store.getFiles)
	const setLoading = useStore(store => store.setLoading)

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

	useEffect(() => {
		const filteredFiles = getValidFiles(files)
		setShowFiles(filteredFiles)
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
					time={8}
					onTimeUp={serverErrorTimeHandler}
				/>
			)}
			<Dashboard title="Storage">
				<div className="w-full p-5 grid grid-cols-8 grid-rows-4 gap-2 overflow-auto tb_lg:grid-cols-6 tb_sm:grid-cols-4 tb_sm:grid-rows-6 ph_lg:grid-cols-2">
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
					<FileAdd onChange={changeFilesHandler} fill="all" multiple />
				</div>
			</Dashboard>
		</>
	)
}
