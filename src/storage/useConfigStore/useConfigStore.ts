// Types
import {
	IConfig,
	IConfigStore,
	ICreateConfigResponse,
	IGetThemesResponse,
	IUpdateConfigResponse,
} from './types'

// Utils
import axios from '@/configuration/axios'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { EConfigStoreApiRoutes } from './types'

// Default storage object.
const defaultConfigStore = {
	themes: [],
	config: null,
}

/** With this hook you can access the notification storage. */
export const useConfigStore = create(
	persist<IConfigStore>(
		(set, get) => ({
			...defaultConfigStore,
			async getThemes() {
				try {
					// We send a request to the API to receive color themes.
					const { data } = await axios.get<IGetThemesResponse>(
						EConfigStoreApiRoutes.getThemes,
					)

					// if there are no color themes.
					if (!data.themes.length) {
						// Return false.
						return false
					}

					// We change the config value in the repository.
					set({ themes: data.themes })

					// Return true.
					return true
				} catch (e) {
					// We display the error in the console.
					console.error(e)

					// Return false.
					return false
				}
			},
			async createConfig(round, themeId) {
				try {
					// User payload.
					const payload: { round?: string; themeId?: string } = {}

					// If the user specified a rounding of elements.
					if (round) {
						// We place it in the payload.
						payload.round = round
					}

					// If the user has selected a topic.
					if (themeId) {
						// We place it in the payload.
						payload.themeId = themeId
					}

					// We send a request to the API.
					const { data } = await axios.post<ICreateConfigResponse>(
						EConfigStoreApiRoutes.configManagement,
						payload,
					)

					// If the request is unsuccessful.
					if (!data.success) {
						// Return false.
						return false
					}

					// Send a request to receive the user configuration.
					await get().getConfig()

					// Return true
					return true
				} catch (e) {
					// We display the error in the console.
					console.error(e)

					// Return false
					return false
				}
			},
			async updateConfig(round, themeId) {
				try {
					// User payload.
					const payload: { round?: string; themeId?: string } = {}

					// If the user specified a rounding of elements.
					if (round) {
						// We place it in the payload.
						payload.round = round
					}

					// If the user has selected a topic.
					if (themeId) {
						// We place it in the payload.
						payload.themeId = themeId
					}

					// We send a request to the API.
					const { data } = await axios.patch<IUpdateConfigResponse>(
						EConfigStoreApiRoutes.configManagement,
						payload,
					)

					// If the request is unsuccessful.
					if (!data.success) {
						// Return false.
						return false
					}

					// Send a request to receive the user configuration.
					await get().getConfig()

					// Return true
					return true
				} catch (e) {
					// We display the error in the console.
					console.error(e)
					// Return false
					return false
				}
			},
			async getConfig() {
				try {
					// Send a request to receive the user configuration.
					const { data } = await axios.get<IConfig>(
						EConfigStoreApiRoutes.configManagement,
					)

					// If the configuration did not come from the API.
					if (!data) {
						// Return false.
						return false
					}

					// We change the configuration value in the storage.
					set({ config: data })

					// Return true.
					return true
				} catch (e) {
					// We display the error in the console.
					console.error(e)

					// Return false.
					return false
				}
			},
			reset() {
				// We reset the storage to its original state.
				set(defaultConfigStore)
			},
		}),
		{ name: 'config-store' },
	),
)
