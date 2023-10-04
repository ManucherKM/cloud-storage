import { IFile } from '@/storage/useFileStore/types'
import { getExtension } from '@/utils'
import { FileItem } from 'kuui-react'
import { Dispatch, FC, SetStateAction, useRef } from 'react'
import Selecto from 'react-selecto'
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
	const activeClass = useRef<string>('_active_17w3d_39')

	function clickHandler(file: IFile) {
		console.log('Click file: ', file)
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
							extension={extension}
							onClick={() => clickHandler(file)}
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
				onSelect={e => {
					e.added.forEach(el => {
						el.classList.add(activeClass.current)

						const fileId = el.dataset.id

						if (!fileId) {
							return
						}

						setSelectedFiles(prev => [...prev, fileId])
					})

					e.removed.forEach(el => {
						el.classList.remove(activeClass.current)

						const fileId = el.dataset.id

						if (!fileId) {
							return
						}

						setSelectedFiles(prev => prev.filter(id => id !== fileId))
					})
				}}
			/>
		</>
	)
}
