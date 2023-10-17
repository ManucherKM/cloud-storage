import axios from '@/configuration/axios'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { useAuthStore } from '..'
import {
	ERestoreAccountApiRoutes,
	IResponseChangePassword,
	IResponseCreateOtp,
	IResponseVerificationOtp,
	IRestoreAccountStore,
} from './types'

const defaultRestoreAccountStore = {
	email: '',
}

export const useRestoreAccount = create(
	persist<IRestoreAccountStore>(
		set => ({
			...defaultRestoreAccountStore,
			setEmail(email) {
				set({ email })
			},
			async createOtp() {
				try {
					const email = useRestoreAccount.getState().email

					if (!email) {
						return false
					}

					const { data } = await axios.post<IResponseCreateOtp>(
						ERestoreAccountApiRoutes.createOtp,
						{
							email,
						},
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

			async verificationOtp(otp) {
				try {
					const email = useRestoreAccount.getState().email

					if (!email) {
						return false
					}

					const { data } = await axios.post<IResponseVerificationOtp>(
						ERestoreAccountApiRoutes.verificationOtp,
						{
							email,
							otp,
						},
					)

					if (!data?.accessToken) {
						return false
					}

					useAuthStore.getState().setToken(data.accessToken)

					return true
				} catch (e) {
					console.error(e)
					return false
				}
			},

			async changePassword(password) {
				try {
					const { token, setToken } = useAuthStore.getState()

					if (!token) {
						return false
					}

					const { data } = await axios.patch<IResponseChangePassword>(
						ERestoreAccountApiRoutes.changePassword,
						{
							password,
						},
					)

					if (!data?.success) {
						return false
					}

					setToken(null)

					return true
				} catch (e) {
					console.error(e)
					return false
				}
			},
			reset() {
				set(defaultRestoreAccountStore)
			},
		}),
		{ name: 'restore-account-store' },
	),
)
