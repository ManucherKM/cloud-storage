import axios from '@/axios'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import {
	EUseAuthStoreApiRoutes,
	IAuthStore,
	ILoginResponse,
	IRegistrationResponse,
} from './types'

export const useAuthStore = create(
	persist<IAuthStore>(
		(set, get) => ({
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
					const { status } = await axios.post<IRegistrationResponse>(
						EUseAuthStoreApiRoutes.registration,
						registrationDto,
					)

					const isError = status === 400

					if (isError) {
						return false
					}

					return true
				} catch (e) {
					console.error(e)
					return false
				}
			},
			async registrationWithGoogle(token) {
				console.log(token)
			},
		}),
		{ name: 'auth-store' },
	),
)
