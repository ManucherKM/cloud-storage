import axios from '@/configuration/axios'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import {
	EUseAuthStoreApiRoutes,
	IAuthStore,
	ILoginResponse,
	ILoginWithGoogleResponse,
	ILoginWithVKResponse,
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
						EUseAuthStoreApiRoutes.login,
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
						EUseAuthStoreApiRoutes.registration,
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
						EUseAuthStoreApiRoutes.registrationWithGoogle,
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
						EUseAuthStoreApiRoutes.loginWithGoogle,
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
			async registrationWithVk(code) {
				try {
					console.log(code)

					const { data } = await axios.post<IRegistrationWithVKResponse>(
						EUseAuthStoreApiRoutes.registrationWithVK,
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
			async loginWithVK(code) {
				try {
					const { data } = await axios.post<ILoginWithVKResponse>(
						EUseAuthStoreApiRoutes.loginWithVK,
						{ code },
					)

					if (!data?.accessToken) {
						return false
					}

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
