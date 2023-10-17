import { IFile } from '@/storage/useFileStore/types'
import { getExtension, getImageUrl } from '@/utils'
import { FileItem } from 'kuui-react'
import { Dispatch, FC, SetStateAction } from 'react'
import Selecto, { OnSelect } from 'react-selecto'
import { List } from './List'

const images = ['.jpg', '.jpeg', '.png']

export interface IFileList {
	files: IFile[]
	container: HTMLElement | null
	/**
	 * Array file id
	 */
	selectedFiles: string[]
	setSelectedFiles: Dispatch<SetStateAction<string[]>>
}

export const FileList: FC<IFileList> = ({
	files,
	container,
	selectedFiles,
	setSelectedFiles,
}) => {
	function selectHandler(e: OnSelect) {
		e.added.forEach(el => {
			const fileId = el.dataset.id
			if (!fileId) {
				return
			}

			setSelectedFiles(prev => [...prev, fileId])
		})

		e.removed.forEach(el => {
			const fileId = el.dataset.id

			if (!fileId) {
				return
			}

			setSelectedFiles(prev => prev.filter(id => id !== fileId))
		})
	}

	return (
		<>
			<List
				arr={files}
				callback={file => {
					const [name, extension] = getExtension(file.originalName)

					return (
						<FileItem
							data-id={file.id}
							key={file.id}
							name={name}
							isActive={selectedFiles.includes(file.id)}
							extension={extension}
							className="file"
						>
							<img src={getImageUrl(file.fileName)} alt="img" />
						</FileItem>
					)
				}}
			/>
			<Selecto
				className="!bg-dominant-1-50 !border-dominant-1"
				container={container}
				selectableTargets={['.file']}
				selectByClick
				selectFromInside
				continueSelect={false}
				toggleContinueSelect={'shift'}
				hitRate={100}
				onSelect={selectHandler}
			/>
		</>
	)
}
