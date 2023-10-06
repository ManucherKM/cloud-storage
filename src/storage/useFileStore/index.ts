import axios from '@/configuration/axios'
import { downloadFileFromBuffer, getAuthorization } from '@/utils'
import { AxiosRequestConfig } from 'axios'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { useAuthStore } from '..'
import {
	EFileStoreApiRoutes,
	ICreateArchiveResponse,
	IFile,
	IFileStore,
} from './types'

export const useFileStore = create(
	persist<IFileStore>(
		set => ({
			files: [],
			async getFiles() {
				try {
					const token = useAuthStore.getState().token

					if (!token) {
						return false
					}

					const { data, status } = await axios.get<IFile[]>(
						EFileStoreApiRoutes.getFilesByUserId,
						{
							headers: {
								Authorization: getAuthorization(token),
							},
						},
					)

					if (status !== 200) {
						return false
					}

					set({ files: data })

					return true
				} catch (e) {
					console.error(e)
					return false
				}
			},
			async sendFiles(files) {
				try {
					const token = useAuthStore.getState().token

					if (!token) {
						return false
					}

					const promises = []

					for (const file of files) {
						const formData = new FormData()

						formData.append('file', file)

						const promise = axios.post<IFile>(
							EFileStoreApiRoutes.sendFiles,
							formData,
							{
								headers: {
									Authorization: getAuthorization(token),
								},
							},
						)

						promises.push(promise)
					}

					const data = await Promise.all(promises)

					const formatedData = data.map(({ data }) => data)

					set(prev => ({
						files: [...prev.files, ...formatedData],
					}))

					return true
				} catch (e) {
					console.error(e)
					return false
				}
			},
			async addFileToTrash(files) {
				try {
					const token = useAuthStore.getState().token

					if (!token) {
						return false
					}

					const promises = []

					for (const id of files) {
						const url = EFileStoreApiRoutes.addFileToTrash + '/' + id

						const promise = axios.get<IFile>(url, {
							headers: {
								Authorization: getAuthorization(token),
							},
						})

						promises.push(promise)
					}

					await Promise.all(promises)

					set(store => {
						const prevFiles = store.files

						let currentFiles: IFile[] = []

						for (let file of prevFiles) {
							if (files.includes(file.id)) {
								file.inTheTrash = true
								currentFiles.push(file)
								continue
							}
							currentFiles.push(file)
						}

						return {
							files: currentFiles,
						}
					})

					return true
				} catch (e) {
					console.error(e)
					return false
				}
			},
			async restoreFileFromTrash(files) {
				try {
					const token = useAuthStore.getState().token

					if (!token) {
						return false
					}

					const promises = []

					for (const id of files) {
						const url = EFileStoreApiRoutes.restoreFileFromTrash + '/' + id

						const promise = axios.get<IFile>(url, {
							headers: {
								Authorization: getAuthorization(token),
							},
						})

						promises.push(promise)
					}

					await Promise.all(promises)

					set(store => {
						const prevFiles = store.files

						let currentFiles: IFile[] = []

						for (let file of prevFiles) {
							if (files.includes(file.id)) {
								file.inTheTrash = false
								currentFiles.push(file)
								continue
							}
							currentFiles.push(file)
						}

						return {
							files: currentFiles,
						}
					})

					return true
				} catch (e) {
					console.error(e)
					return false
				}
			},
			async removeFile(files) {
				try {
					const token = useAuthStore.getState().token

					if (!token) {
						return false
					}

					const promises = []

					for (const id of files) {
						const url = EFileStoreApiRoutes.removeFile + '/' + id

						const promise = axios.delete<IFile>(url, {
							headers: {
								Authorization: getAuthorization(token),
							},
						})

						promises.push(promise)
					}

					await Promise.all(promises)

					set(store => {
						const prevFiles = store.files

						let currentFiles: IFile[] = []

						for (let file of prevFiles) {
							if (files.includes(file.id)) {
								continue
							}

							currentFiles.push(file)
						}

						return {
							files: currentFiles,
						}
					})

					return true
				} catch (e) {
					console.error(e)
					return false
				}
			},
			async createArchive(files) {
				try {
					const token = useAuthStore.getState().token

					if (!token) {
						return false
					}

					const config: AxiosRequestConfig = {
						headers: {
							Authorization: getAuthorization(token),
						},
					}

					const payload: { fileIds: string[] } = {
						fileIds: files,
					}

					const { data } = await axios.post<ICreateArchiveResponse>(
						EFileStoreApiRoutes.createArchive,
						payload,
						config,
					)

					if (!data.id) {
						return false
					}

					return data.id
				} catch (e) {
					console.error(e)
					return false
				}
			},
			async downloadArchive(id: string) {
				try {
					const token = useAuthStore.getState().token

					if (!token) {
						return false
					}

					const url = EFileStoreApiRoutes.downloadArchive + '/' + id

					const { data } = await axios.get<Buffer>(url, {
						responseType: 'arraybuffer',
						headers: {
							Authorization: getAuthorization(token),
						},
					})

					if (!data) {
						return false
					}

					downloadFileFromBuffer(data)

					return true
				} catch (e) {
					console.error(e)
					return false
				}
			},
		}),
		{ name: 'file-store' },
	),
)
