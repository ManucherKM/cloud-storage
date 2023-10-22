// Types
import type { IFile } from '@/storage/useFileStore/types'
import type { Dispatch, FC, SetStateAction } from 'react'
import type { OnSelect } from 'react-selecto'

// Utils
import { getExtension, getImageUrl } from '@/utils'

// Components
import { FileItem } from 'kuui-react'
import Selecto from 'react-selecto'
import { List } from './List'

export interface IFileList {
	/** An array of files that need to be rendered. */
	files: IFile[]

	/** Container inside which files will be selected and sampled. */
	container: HTMLElement | null

	/** An array of selected file identifiers. */
	selectedFiles: string[]

	/** Function to change the IDs of the selected files. */
	setSelectedFiles: Dispatch<SetStateAction<string[]>>
}

/**
 * A component for rendering a list of files.
 *
 * @example
 * 	const [showFiles, setShowFiles] = useState([])
 * 	const blockForSelection = useRef(null)
 * 	const [selectedFiles, setSelectedFiles] = useState([])
 *
 * 	return (
 * 		<FileList
 * 			files={showFiles}
 * 			container={blockForSelection.current}
 * 			selectedFiles={selectedFiles}
 * 			setSelectedFiles={setIdOfTheSelectedFiles}
 * 		/>
 * 	)
 *
 * @param props Propses
 */
export const FileList: FC<IFileList> = ({
	files,
	container,
	selectedFiles,
	setSelectedFiles,
}) => {
	/**
	 * Function that will be executed when an element of the file is selected.
	 *
	 * @param e Select event
	 */
	function selectHandler(e: OnSelect) {
		// Iterate over the elements of the files that have been selected.
		e.added.forEach(el => {
			// Get the id of this file.
			const fileId = el.dataset.id

			// If id is not found. Terminate the function.
			if (!fileId) return

			// We change selected files
			setSelectedFiles(prev => [...prev, fileId])
		})

		// Iterate through the files that were deleted.
		e.removed.forEach(el => {
			// Get the id of this file.
			const fileId = el.dataset.id

			// If id is not found. Terminate the function.
			if (!fileId) return

			// We change selected files
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
