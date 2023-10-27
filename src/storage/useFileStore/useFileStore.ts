// Types
import type { ICreateArchiveResponse, IFile, IFileStore } from './types'

// Utils
import axios from '@/configuration/axios'
import { downloadFileFromBuffer } from '@/utils'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { EFileStoreApiRoutes } from './types'

// Default storage object.
const defaultFileStore = {
	files: [],
}

/** With this hook you can access the file storage. */
export const useFileStore = create(
	persist<IFileStore>(
		(set, get) => ({
			...defaultFileStore,
			async getFiles() {
				try {
					// Send a request to receive user files.
					const { data, status } = await axios.get<IFile[]>(
						EFileStoreApiRoutes.getFilesByUserId,
					)

					// If the request is unsuccessful.
					if (status !== 200) {
						// Return false.
						return false
					}

					// Adding files to the storage.
					set({ files: data })

					// Return true.
					return true
				} catch (e) {
					// We display the error in the console.
					console.error(e)

					// Return false.
					return false
				}
			},
			async sendFiles(files) {
				try {
					// An array of file upload request promises.
					const promises = []

					// We go through the files received from the user in a loop.
					for (const file of files) {
						// Create a FormData object.
						const formData = new FormData()

						// Add the current file to FormData.
						formData.append('file', file)

						// We send a request to the API and receive a promise.
						const promise = axios.post<IFile>(
							EFileStoreApiRoutes.fileManagement,
							formData,
						)

						// Add a promise to the promises array.
						promises.push(promise)
					}

					// We are waiting for all promises to be fulfilled.
					const data = await Promise.all(promises)

					// Formats the received data.
					const formatedData = data.map(({ data }) => data)

					// Add the received files to the storage.
					set(prev => ({
						files: [...prev.files, ...formatedData],
					}))

					// Return true.
					return true
				} catch (e) {
					// We display the error in the console.
					console.error(e)

					// Return false.
					return false
				}
			},
			async addFileToTrash(files) {
				try {
					// An array of file change request promises.
					const promises = []

					// We go through the files received from the user in a loop.
					for (const id of files) {
						// Create a URL for an API request.
						const url = EFileStoreApiRoutes.addFileToTrash + '/' + id

						// We send a request to the API and receive a promise.
						const promise = axios.get<IFile>(url)

						// Add a promise to the promises array.
						promises.push(promise)
					}

					// We are waiting for all promises to be fulfilled.
					const data = await Promise.all(promises)

					// Formats the received data.
					const formatedData = data.map(({ data }) => data.id)

					// Previous files.
					const prevFiles = get().files

					// Current files.
					const currentFiles: IFile[] = []

					// Go through the array of previous files.
					for (const file of prevFiles) {
						// If the changed files contain the current file.
						if (formatedData.includes(file.id)) {
							// We change its value inTheTrash.
							file.inTheTrash = true

							// We add it to the array of new files.
							currentFiles.push(file)

							// Let's move on to the next cycle.
							continue
						}

						// Add the file to the array of new files.
						currentFiles.push(file)
					}

					// We change files in the storage.
					set({ files: currentFiles })

					// Return true
					return true
				} catch (e) {
					// We display the error in the console.
					console.error(e)

					// Return false
					return false
				}
			},
			async restoreFileFromTrash(files) {
				try {
					// An array of file change request promises.
					const promises = []

					// We go through the files received from the user in a loop.
					for (const id of files) {
						// Create a URL for an API request.
						const url = EFileStoreApiRoutes.restoreFileFromTrash + '/' + id

						// We send a request to the API and receive a promise.
						const promise = axios.get<IFile>(url)

						// Add a promise to the promises array.
						promises.push(promise)
					}

					// We are waiting for all promises to be fulfilled.
					const data = await Promise.all(promises)

					// Formats the received data.
					const formatedData = data.map(({ data }) => data.id)

					// Previous files.
					const prevFiles = get().files

					// Current files.
					const currentFiles: IFile[] = []

					// Go through the array of previous files.
					for (const file of prevFiles) {
						// If the changed files contain the current file.
						if (formatedData.includes(file.id)) {
							// We change its value inTheTrash.
							file.inTheTrash = false

							// We add it to the array of new files.
							currentFiles.push(file)

							// Let's move on to the next cycle.
							continue
						}

						// Add the file to the array of new files.
						currentFiles.push(file)
					}

					// We change files in the storage.
					set({ files: currentFiles })

					// Return true
					return true
				} catch (e) {
					// We display the error in the console.
					console.error(e)

					// Return false
					return false
				}
			},
			async removeFiles(files) {
				try {
					// An array of file change request promises.
					const promises = []

					// We go through the files received from the user in a loop.
					for (const id of files) {
						// Create a URL for an API request.
						const url = EFileStoreApiRoutes.fileManagement + '/' + id

						// We send a request to the API and receive a promise.
						const promise = axios.delete<IFile>(url)

						// Add a promise to the promises array.
						promises.push(promise)
					}

					// We are waiting for all promises to be fulfilled.
					const data = await Promise.all(promises)

					// Formats the received data.
					const formatedData = data.map(({ data }) => data.id)

					// Previous files.
					const prevFiles = get().files

					// Current files.
					const currentFiles: IFile[] = prevFiles.filter(
						f => !formatedData.includes(f.id),
					)

					// We change files in the storage.
					set({ files: currentFiles })

					// Return true
					return true
				} catch (e) {
					// We display the error in the console.
					console.error(e)

					// Return false
					return false
				}
			},
			async createArchive(files) {
				try {
					// Send a request to the API to create an archive.
					const { data } = await axios.post<ICreateArchiveResponse>(
						EFileStoreApiRoutes.createArchive,
						{
							fileIds: files,
						},
					)

					// If the archive id does not exist.
					if (!data.id) {
						// Return false.
						return false
					}

					// Return archive id.
					return data.id
				} catch (e) {
					// We display the error in the console.
					console.error(e)

					// Return false
					return false
				}
			},
			async downloadArchive(id: string) {
				try {
					// Create a URL to download the archive.
					const url = EFileStoreApiRoutes.downloadArchive + '/' + id

					// We send a request to download the archive.
					const { data } = await axios.get<Buffer>(url, {
						responseType: 'arraybuffer',
					})

					// If the file is not received.
					if (!data) {
						// Return false
						return false
					}

					// Download the archive to the user's device.
					downloadFileFromBuffer(data)

					// Return true
					return true
				} catch (e) {
					// We display the error in the console.
					console.error(e)

					// Return false
					return false
				}
			},
			reset() {
				// We reset the storage to its original state.
				set(defaultFileStore)
			},
		}),
		{ name: 'file-store' },
	),
)
