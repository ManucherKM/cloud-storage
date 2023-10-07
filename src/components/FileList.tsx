import { IFile } from '@/storage/useFileStore/types'
import { getExtension } from '@/utils'
import { FileItem } from 'kuui-react'
import { Dispatch, FC, SetStateAction, useRef } from 'react'
import Selecto, { OnSelect, SelectoProps } from 'react-selecto'
import { List } from './List'

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
						/>
					)
				}}
			/>
			<Selecto
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
