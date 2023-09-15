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
				const { data } = await axios.post<ILoginResponse>(
					EUseAuthStoreApiRoutes.login,
					loginDto,
				)

				if (!data?.accessToken) {
					return
				}

				set({ token: data.accessToken })

				return data.accessToken
			},
			async registration(registrationDto) {
				try {
					const { status } = await axios.post<IRegistrationResponse>(
						EUseAuthStoreApiRoutes.registration,
						registrationDto,
					)

					if (status === 400) {
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
