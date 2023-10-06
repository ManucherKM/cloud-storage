import { IFile } from '@/storage/useFileStore/types'

export function getTrashFiles(files: IFile[]) {
	return files.filter(file => file.inTheTrash)
}
