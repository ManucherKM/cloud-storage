import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { EFileStoreApiRoutes, IFile, IFileStore } from './types'
import axios from '@/configuration/axios'
import { getAuthorization } from '@/utils'
import { useAuthStore } from '..'

export const useFileStore = create(
	persist<IFileStore>(
		set => ({
			files: [],
			async getFiles() {
				try {
					const token = useAuthStore.getState().token

					if (!token) {
						console.log('The token could not be found.')
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
						console.log('The token could not be found.')
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
		}),
		{ name: 'file-store' },
	),
)
