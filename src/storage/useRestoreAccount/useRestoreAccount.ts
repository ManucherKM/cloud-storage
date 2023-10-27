// Types
import type {
	IResponseChangePassword,
	IResponseCreateOtp,
	IResponseVerificationOtp,
	IRestoreAccountStore,
} from './types'

// Utils
import axios from '@/configuration/axios'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { useAuthStore } from '../useAuthStore/useAuthStore'
import { ERestoreAccountApiRoutes } from './types'

// Default storage object.
const defaultRestoreAccountStore = {
	email: '',
}

/** With this hook you can access the restore account storage. */
export const useRestoreAccount = create(
	persist<IRestoreAccountStore>(
		(set, get) => ({
			...defaultRestoreAccountStore,
			setEmail(email) {
				// Change email to a new value.
				set({ email })
			},
			async createOtp() {
				try {
					// Retrieve email from storage.
					const email = get().email

					// If the email was not specified.
					if (!email) {
						// Return false.
						return false
					}

					// We send a request to create a one-time password.
					const { data } = await axios.post<IResponseCreateOtp>(
						ERestoreAccountApiRoutes.createOtp,
						{
							email,
						},
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

			async verificationOtp(otp) {
				try {
					// Retrieve email from storage.
					const email = get().email

					// If the email was not specified.
					if (!email) {
						// Return false.
						return false
					}

					// We send a request to verify the one-time password.
					const { data } = await axios.post<IResponseVerificationOtp>(
						ERestoreAccountApiRoutes.verificationOtp,
						{
							email,
							otp,
						},
					)

					// If the access token is not found.
					if (!data?.accessToken) {
						// Return false.
						return false
					}

					// We change the access token in the authorization store, thereby giving access to the account for the duration of the access token to change the password.
					useAuthStore.getState().setToken(data.accessToken)

					// Return true.
					return true
				} catch (e) {
					// We show the error in the console.
					console.error(e)

					// Return false.
					return false
				}
			},

			async changePassword(password) {
				try {
					//We get a function for changing the access token.
					const setToken = useAuthStore.getState().setToken

					// We send a request to change the password.
					const { data } = await axios.patch<IResponseChangePassword>(
						ERestoreAccountApiRoutes.changePassword,
						{
							password,
						},
					)

					// If the request is unsuccessful.
					if (!data?.success) {
						// Return false.
						return false
					}

					// We delete the token given earlier.
					setToken(null)

					// Return true.
					return true
				} catch (e) {
					// We show the error in the console.
					console.error(e)

					// Return false.
					return false
				}
			},
			reset() {
				// We reset the storage to its original state.
				set(defaultRestoreAccountStore)
			},
		}),
		{ name: 'restore-account-store' },
	),
)
