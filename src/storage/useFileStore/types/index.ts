/** File interface */
export interface IFile {
	/** File id */
	id: string

	/** Unicue file name */
	fileName: string

	/** User file name */
	originalName: string

	/** A flag indicating whether the file is in the trash or not. */
	inTheTrash: boolean
}

/** Server response interface when creating an archive. */
export interface ICreateArchiveResponse {
	/** Archive id. */
	id: string
}

/** File store interface */
export interface IFileStore {
	/** User files */
	files: IFile[]

	/** Function for receiving user files. */
	getFiles: () => Promise<boolean>

	/**
	 * Function for uploading a user file to the server.
	 *
	 * @param files Files added by the user.
	 */
	sendFiles: (files: FileList) => Promise<boolean>

	/**
	 * Function for adding user files to the trash.
	 *
	 * @param files Files selected by the user.
	 */
	addFileToTrash: (files: string[]) => Promise<boolean>

	/**
	 * Function for recovering user files.
	 *
	 * @param files Files selected by the user.
	 */
	restoreFileFromTrash: (files: string[]) => Promise<boolean>

	/**
	 * Function for completely deleting user files.
	 *
	 * @param files Files selected by the user.
	 */
	removeFiles: (files: string[]) => Promise<boolean>

	/**
	 * Function for creating an archive that the user can share.
	 *
	 * @param files Files selected by the user.
	 */
	createArchive: (files: string[]) => Promise<boolean | string>

	/**
	 * A function that installs an archive to a user-selected location.
	 *
	 * @param id Archive id.
	 */
	downloadArchive: (id: string) => Promise<boolean>

	/** Function to reset the storage to its initial state. */
	reset: () => void
}

/** Routes for api requests to the file store. */
export enum EFileStoreApiRoutes {
	/** Route for retrieving user files by user ID. */
	getFilesByUserId = '/api/file/userId',

	/** Route for managing user files (delete, upload to server). */
	fileManagement = '/api/file',

	/** Route for adding user files to the trash. */
	addFileToTrash = '/api/file/trash/on',

	/** Route for creating an archive. */
	createArchive = '/api/archive',

	/** Route for downloading the archive. */
	downloadArchive = '/api/archive/share',

	/** Route for restoring the user file. */
	restoreFileFromTrash = '/api/file/trash/off',
}
