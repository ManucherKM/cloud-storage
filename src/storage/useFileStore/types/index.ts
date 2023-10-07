export interface IFile {
	id: string
	fileName: string
	originalName: string
	inTheTrash: boolean
}

export interface ICreateArchiveResponse {
	id: string
}

export interface IFileStore {
	files: IFile[]
	getFiles: () => Promise<boolean>
	sendFiles: (files: FileList) => Promise<boolean>
	addFileToTrash: (files: string[]) => Promise<boolean>
	restoreFileFromTrash: (files: string[]) => Promise<boolean>
	removeFile: (files: string[]) => Promise<boolean>
	createArchive: (files: string[]) => Promise<boolean | string>
	downloadArchive: (id: string) => Promise<boolean>
	reset: () => void
}

export enum EFileStoreApiRoutes {
	getFilesByUserId = '/api/file/userId',
	sendFiles = '/api/file',
	addFileToTrash = '/api/file/trash/on',
	createArchive = '/api/archive',
	downloadArchive = '/api/archive/share',
	restoreFileFromTrash = '/api/file/trash/off',
	removeFile = '/api/file',
}
