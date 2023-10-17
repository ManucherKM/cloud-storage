import axios from '@/configuration/axios'
import { env } from '@/configuration/env'
import { history } from '@/configuration/history'
import { ERoutes } from '@/configuration/routes'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { useFileStore, useStore } from '..'
import { useConfigStore } from '../useConfigStore/useConfigStore'
import {
	EAuthStoreApiRoutes,
	IAuthStore,
	IGetNewAccessTokenResponse,
	ILoginResponse,
	ILoginWithGoogleResponse,
	ILoginWithVKResponse,
	ILogoutResponse,
	IRegistrationResponse,
	IRegistrationWithGoogleResponse,
	IRegistrationWithVKResponse,
} from './types'

const CLIENT_URL = env.get('CLIENT_URL').required().asString()

const defaultAuthStore = {
	token: null,
}

/** With this hook you can access the authorization repository. */
export const useAuthStore = create(
	persist<IAuthStore>(
		(set, get) => ({
			...defaultAuthStore,
			async login(loginDto) {
				try {
					const { data } = await axios.post<ILoginResponse>(
						EAuthStoreApiRoutes.login,
						loginDto,
					)

					if (!data?.accessToken) {
						return false
					}

					set({ token: data.accessToken })

					return true
				} catch (e) {
					console.error(e)
					return false
				}
			},
			async registration(registrationDto) {
				try {
					const { data } = await axios.post<IRegistrationResponse>(
						EAuthStoreApiRoutes.registration,
						registrationDto,
					)

					if (!data?.success) {
						return false
					}

					return true
				} catch (e) {
					console.error(e)
					return false
				}
			},
			async registrationWithGoogle(code) {
				try {
					const { data } = await axios.post<IRegistrationWithGoogleResponse>(
						EAuthStoreApiRoutes.registrationWithGoogle,
						{ code },
					)

					if (!data?.success) {
						return false
					}

					return true
				} catch (e) {
					console.error(e)
					return false
				}
			},
			async loginWithGoogle(code) {
				try {
					const { data } = await axios.post<ILoginWithGoogleResponse>(
						EAuthStoreApiRoutes.loginWithGoogle,
						{ code },
					)

					if (!data?.accessToken) {
						return false
					}

					set({ token: data.accessToken })

					return true
				} catch (e) {
					console.error(e)
					return false
				}
			},
			async registrationWithVk(code, redirectUri) {
				try {
					const { data } = await axios.post<IRegistrationWithVKResponse>(
						EAuthStoreApiRoutes.registrationWithVK,
						{ code, redirectUri },
					)

					if (!data?.success) {
						return false
					}

					return true
				} catch (e) {
					console.error(e)
					return false
				}
			},
			async loginWithVK(code, redirectUri) {
				try {
					const { data } = await axios.post<ILoginWithVKResponse>(
						EAuthStoreApiRoutes.loginWithVK,
						{ code, redirectUri },
					)

					if (!data?.accessToken) {
						return false
					}

					set({ token: data.accessToken })

					return true
				} catch (e) {
					console.error(e)
					return false
				}
			},
			async logout() {
				try {
					const { data } = await axios.get<ILogoutResponse>(
						EAuthStoreApiRoutes.logout,
					)

					if (!data?.success) {
						return false
					}

					useAuthStore.getState().reset()
					useConfigStore.getState().reset()
					useFileStore.getState().reset()
					useStore.getState().reset()
					get().reset()

					return true
				} catch (e) {
					console.error(e)
					return false
				}
			},
			async getNewAccessToken() {
				try {
					const { data } = await axios.post<IGetNewAccessTokenResponse>(
						EAuthStoreApiRoutes.getNewAccessToken,
					)

					if (!data.accessToken) {
						return false
					}

					set({ token: data.accessToken })

					return true
				} catch (e) {
					console.error(e)
					get().logout()

					history.push(CLIENT_URL + ERoutes.login)
					return false
				}
			},
			setToken(token) {
				set({ token })
			},
			reset() {
				set(defaultAuthStore)
			},
		}),
		{ name: 'auth-store' },
	),
)
