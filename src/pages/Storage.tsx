import { FC, useEffect, useState } from 'react'
import { Menu } from '@/components/Menu'
import { IFile } from '@/storage/useFileStore/types'
import { useFileStore } from '@/storage'
import { List } from '@/components'

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
				<div className="w-full min-w-[150px] max-w-[200px] border-solid border-0 border-r border-[--kuui-black-500]">
					<Menu />
				</div>

				<div className="w-full ">
					<List
						arr={showFiles}
						callback={item => <span key={item.id}>{item.originalName}</span>}
					/>
				</div>
			</div>
		</div>
	)
}
