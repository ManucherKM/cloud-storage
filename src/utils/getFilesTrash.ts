// Types
import type { IFile } from '@/storage/useFileStore/types'

/**
 *Using this function, you can filter an array of files and get those that should be in the trash.
 * @param files array of files
 */
export function getTrashFiles(files: IFile[]) {
	return files.filter(file => file.inTheTrash)
}
