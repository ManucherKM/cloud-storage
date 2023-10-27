// Types
import type {
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

// Utils
import axios from '@/configuration/axios'
import { env } from '@/configuration/env'
import { history } from '@/configuration/history'
import { ERoutes } from '@/configuration/routes'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { useConfigStore } from '../useConfigStore/useConfigStore'
import { useFileStore } from '../useFileStore/useFileStore'
import { useNotificationsStore } from '../useNotificationsStore/useNotificationsStore'
import { useStore } from '../useStore/useStore'
import { EAuthStoreApiRoutes } from './types'

// The URL where the web application is hosted.
const CLIENT_URL = env.get('CLIENT_URL').required().asString()

// Default storage object.
const defaultAuthStore = {
	token: null,
} as IAuthStore

/** With this hook you can access the authorization storage. */
export const useAuthStore = create(
	persist<IAuthStore>(
		(set, get) => ({
			...defaultAuthStore,
			async login(loginDto) {
				try {
					// We send a request for user authorization to the API.
					const { data } = await axios.post<ILoginResponse>(
						EAuthStoreApiRoutes.login,
						loginDto,
					)

					// Check if the access token has arrived.
					if (!data?.accessToken) {
						// If there is no token, return false.
						return false
					}

					// We change the state of the token in the storage.
					set({ token: data.accessToken })

					// Return true.
					return true
				} catch (e) {
					// We show the error in the console.
					console.error(e)

					// Return false.
					return false
				}
			},
			async registration(registrationDto) {
				try {
					// We send a request for user registration to the API.
					const { data } = await axios.post<IRegistrationResponse>(
						EAuthStoreApiRoutes.registration,
						registrationDto,
					)

					// If the request is unsuccessful.
					if (!data?.success) {
						// Return false.
						return false
					}

					// Return true.
					return true
				} catch (e) {
					// We show the error in the console.
					console.error(e)

					// Return false.
					return false
				}
			},
			async registrationWithGoogle(code) {
				try {
					// We send a request for user registration with Google to the API.
					const { data } = await axios.post<IRegistrationWithGoogleResponse>(
						EAuthStoreApiRoutes.registrationWithGoogle,
						{ code },
					)

					// If the request is unsuccessful.
					if (!data?.success) {
						// Return false.
						return false
					}

					// Return true.
					return true
				} catch (e) {
					// We show the error in the console.
					console.error(e)
					// Return false.
					return false
				}
			},
			async loginWithGoogle(code) {
				try {
					// We send a request for user authorization with Google to the API.
					const { data } = await axios.post<ILoginWithGoogleResponse>(
						EAuthStoreApiRoutes.loginWithGoogle,
						{ code },
					)

					// Check if the access token has arrived.
					if (!data?.accessToken) {
						// If there is no token, return false.
						return false
					}

					// We change the state of the token in the storage.
					set({ token: data.accessToken })

					// Return true.
					return true
				} catch (e) {
					// We show the error in the console.
					console.error(e)
					// Return false.
					return false
				}
			},
			async registrationWithVk(code, redirectUri) {
				try {
					// We send a request for user registration with VK to the API.
					const { data } = await axios.post<IRegistrationWithVKResponse>(
						EAuthStoreApiRoutes.registrationWithVK,
						{ code, redirectUri },
					)

					// If the request is unsuccessful.
					if (!data?.success) {
						// Return false.
						return false
					}

					// Return true.
					return true
				} catch (e) {
					// We show the error in the console.
					console.error(e)

					// Return false.
					return false
				}
			},
			async loginWithVK(code, redirectUri) {
				try {
					// We send a request for user login with VK to the API.
					const { data } = await axios.post<ILoginWithVKResponse>(
						EAuthStoreApiRoutes.loginWithVK,
						{ code, redirectUri },
					)

					// Check if the access token has arrived.
					if (!data?.accessToken) {
						// If there is no token, return false.
						return false
					}

					// We change the state of the token in the storage.
					set({ token: data.accessToken })

					// Return true.
					return true
				} catch (e) {
					// We show the error in the console.
					console.error(e)
					// Return false.
					return false
				}
			},
			async logout() {
				try {
					// send a request to log out of your account to the API.
					const { data } = await axios.get<ILogoutResponse>(
						EAuthStoreApiRoutes.logout,
					)

					// If the request is unsuccessful.
					if (!data?.success) {
						// Return false.
						return false
					}

					// We reset the config-store storage.
					useConfigStore.getState().reset()

					// We reset the file-store storage.
					useFileStore.getState().reset()

					// We reset the notifications-store storage.
					useNotificationsStore.getState().reset()

					// Reset the shared storage.
					useStore.getState().reset()

					// We reset the auth-store storage.
					get().reset()

					// Return true.
					return true
				} catch (e) {
					// We show the error in the console.
					console.error(e)
					// Return false.
					return false
				}
			},
			async getNewAccessToken() {
				try {
					// send a request to receive an access token.
					const { data } = await axios.post<IGetNewAccessTokenResponse>(
						EAuthStoreApiRoutes.getNewAccessToken,
					)

					// Check whether the access token was received from the API.
					if (!data.accessToken) {
						// If not, return false.
						return false
					}

					// We change the state of the token in the storage.
					set({ token: data.accessToken })

					// Return true.
					return true
				} catch (e) {
					// We show the error in the console.
					console.error(e)

					// If we were unable to obtain an access token, log out of the user account.
					get().logout()

					// Redirecting the user to the login page.
					history.push(CLIENT_URL + ERoutes.login)
					// Return false.
					return false
				}
			},
			setToken(token) {
				// We change the token.
				set({ token })
			},
			reset() {
				// We reset the storage to its original state.
				set(defaultAuthStore)
			},
		}),
		{ name: 'auth-store' },
	),
)
