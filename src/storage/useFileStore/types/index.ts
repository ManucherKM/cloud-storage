export interface IFile {
	id: string
	fileName: string
	originalName: string
	inTheTrash: boolean
}

export interface IFileStore {
	files: IFile[]
	getFiles: () => Promise<boolean>
}

export enum EFileStoreApiRoutes {
	files = '/api/file/userId',
}
