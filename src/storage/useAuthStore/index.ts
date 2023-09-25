import axios from '@/configuration/axios'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import {
	EAuthStoreApiRoutes,
	IAuthStore,
	ILoginResponse,
	ILoginWithGoogleResponse,
	ILoginWithVKResponse,
	ILogoutResponse,
	IRegistrationResponse,
	IRegistrationWithGoogleResponse,
	IRegistrationWithVKResponse,
} from './types'

/** With this hook you can access the authorization repository. */
export const useAuthStore = create(
	persist<IAuthStore>(
		set => ({
			token: null,
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

					set({ token: '' })

					return true
				} catch (e) {
					console.error(e)
					return false
				}
			},
		}),
		{ name: 'auth-store' },
	),
)
