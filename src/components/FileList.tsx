import { IFile } from '@/storage/useFileStore/types'
import { getExtension } from '@/utils'
import { FileItem } from 'kuui-react'
import { FC } from 'react'
import { List } from './List'

export interface IFileList {
	files: IFile[]
}

export const FileList: FC<IFileList> = ({ files }) => {
	function clickHandler(file: IFile) {
		console.log(file)
	}

	return (
		<List
			arr={files}
			callback={file => {
				const [name, extension] = getExtension(file.originalName)
				return (
					<FileItem
						key={file.id}
						name={name}
						extension={extension}
						onClick={() => clickHandler(file)}
					/>
				)
			}}
		/>
	)
}
