export interface IFile {
	id: string
	fileName: string
	originalName: string
	inTheTrash: boolean
}

export interface IFileStore {
	files: IFile[]
	getFiles: () => Promise<boolean>
	sendFiles: (files: FileList) => Promise<boolean>
	addFileToTrash: (files: string[]) => Promise<boolean>
}

export enum EFileStoreApiRoutes {
	getFilesByUserId = '/api/file/userId',
	sendFiles = '/api/file',
	addFileToTrash = '/api/file/trash/on',
}
