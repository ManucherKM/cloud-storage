import axios from '@/configuration/axios'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { useAuthStore } from '..'
import {
	EConfigStoreApiRoutes,
	IConfig,
	IConfigStore,
	ICreateConfigResponse,
	IGetThemesResponse,
	IUpdateConfigResponse,
} from './types'

const defaultConfigStore = {
	themes: [],
	config: null,
}

export const useConfigStore = create(
	persist<IConfigStore>(
		(set, get) => ({
			...defaultConfigStore,
			async getThemes() {
				try {
					const token = useAuthStore.getState().token

					if (!token) {
						return false
					}

					const { data } = await axios.get<IGetThemesResponse>(
						EConfigStoreApiRoutes.getThemes,
					)

					if (!data.themes.length) {
						return false
					}

					set({ themes: data.themes })

					return true
				} catch (e) {
					console.error(e)
					return false
				}
			},
			async createConfig(round, themeId) {
				try {
					const token = useAuthStore.getState().token

					if (!token) {
						return false
					}

					const payload: { round?: string; themeId?: string } = {}

					if (round) {
						payload.round = round
					}

					if (themeId) {
						payload.themeId = themeId
					}

					const { data } = await axios.post<ICreateConfigResponse>(
						EConfigStoreApiRoutes.configManagement,
						payload,
					)

					if (!data.success) {
						return false
					}

					await get().getConfig()

					return true
				} catch (e) {
					console.error(e)
					return false
				}
			},
			async updateConfig(round, themeId) {
				try {
					const token = useAuthStore.getState().token

					if (!token) {
						return false
					}

					const payload: { round?: string; themeId?: string } = {}

					if (round) {
						payload.round = round
					}

					if (themeId) {
						payload.themeId = themeId
					}

					const { data } = await axios.patch<IUpdateConfigResponse>(
						EConfigStoreApiRoutes.configManagement,
						payload,
					)

					if (!data.success) {
						return false
					}

					await get().getConfig()

					return true
				} catch (e) {
					console.error(e)
					return false
				}
			},
			async getConfig() {
				try {
					const token = useAuthStore.getState().token

					if (!token) {
						return false
					}

					const { data } = await axios.get<IConfig>(
						EConfigStoreApiRoutes.configManagement,
					)

					if (!data) {
						return false
					}

					set({ config: data })

					return true
				} catch (e) {
					console.error(e)
					return false
				}
			},
			reset() {
				set(defaultConfigStore)
			},
		}),
		{ name: 'config-store' },
	),
)
