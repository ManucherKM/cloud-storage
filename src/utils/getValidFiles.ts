import { IFile } from '@/storage/useFileStore/types'

export function getValidFiles(files: IFile[]) {
	return files.filter(file => !file.inTheTrash)
}
