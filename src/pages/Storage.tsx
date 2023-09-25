import { FC, useEffect, useState } from 'react'
import { Menu } from '@/components/Menu'
import { IFile } from '@/storage/useFileStore/types'
import { useFileStore } from '@/storage'
import { List } from '@/components'
import { FileItem } from 'kuui-react'
import { getExtension } from '@/utils'

const filterValidFiles = (arr: IFile[]) => arr.filter(item => !item.inTheTrash)

export const Storage: FC = () => {
	// const [files, setFiles] = useState<IFile[]>([])

	const files = useFileStore(store => store.files)

	const [showFiles, setShowFiles] = useState<IFile[]>([])

	useEffect(() => {
		const filteredFiles = filterValidFiles(files)
		setShowFiles(filteredFiles)
	}, [files])
	return (
		<div className="w-full h-full p-5">
			<div className="w-full h-full bg-[--kuui-black-500] rounded-xl flex overflow-hidden">
				<div className="w-full min-w-[150px] max-w-[200px] border-solid border-0 border-r border-[--kuui-black-250]">
					<Menu />
				</div>

				<div className="w-full p-5 grid grid-cols-8 grid-rows-4 tb_lg:grid-cols-6 tb_sm:grid-cols-4 tb_sm:grid-rows-6">
					<List
						arr={showFiles}
						callback={item => {
							const [name, extension] = getExtension(item.originalName)
							return (
								<FileItem
									key={item.id}
									name={name}
									extension={extension}
									onClick={() => console.log(item.fileName)}
								/>
							)
						}}
					/>
				</div>
			</div>
		</div>
	)
}
