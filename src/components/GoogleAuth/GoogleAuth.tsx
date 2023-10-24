import { ERoutes } from '@/configuration/routes'
import { useLoader } from '@/hooks'
import { useAuthStore, useNotificationsStore } from '@/storage'
import { useGoogleLogin } from '@react-oauth/google'
import {
	IGoogleAuth as IKuuiGoogleAuth,
	GoogleAuth as KuuiGoogleAuth,
} from 'kuui-react'
import { FC } from 'react'
import { useNavigate } from 'react-router'
import { EGoogleAuthVariant } from './types'

export type TGoogleAuth = Omit<IKuuiGoogleAuth, 'onClick'>

export interface IGoogleAuth extends TGoogleAuth {
	logics: `${EGoogleAuthVariant}`
}

export const GoogleAuth: FC<IGoogleAuth> = ({ logics, ...props }) => {
	// Function to create a new error to show it to the user.
	const newError = useNotificationsStore(store => store.newError)

	//  With this feature, you can send your user details for authorization with Google.
	const loginWithGoogle = useAuthStore(store => store.loginWithGoogle)

	// With this feature, you can send your user details for registration with Google.
	const registrationWithGoogle = useAuthStore(
		state => state.registrationWithGoogle,
	)

	// With this feature, you can redirect the user to another route.
	const navigate = useNavigate()

	// A function for showing Loader to the user when requesting an API.
	const loader = useLoader()

	// Handler function to send user data to the API on successful authorization via Google.
	async function googleLoginOnSuccess(code: string) {
		const isSuccess = await loader(loginWithGoogle, code)

		// If the result is unsuccessful.
		if (!isSuccess) {
			newError('Failed to login.')

			// Stop further execution of the function.
			return
		}

		// We redirect the user to the storage page.
		navigate(ERoutes.storage)
	}

	//  Handler function to send user data to the API on successful authorization via Google.
	async function googleRegistrationOnSuccess(code: string) {
		// We get the result of sending data to the API.
		const isSuccess = await loader(registrationWithGoogle, code)

		// If the result is unsuccessful.
		if (!isSuccess) {
			newError('Failed to register.')

			// Stop further execution of the function.
			return
		}

		// We redirect the user to the authorization page.
		navigate(ERoutes.login)
	}

	// Function to bring up a popup window for authorization via Google.
	const googlePopup = useGoogleLogin({
		flow: 'auth-code',
		onError: console.error,
		onSuccess: async ({ code }) => {
			if (logics === EGoogleAuthVariant.login) {
				return await googleLoginOnSuccess(code)
			} else if (logics === EGoogleAuthVariant.registration) {
				return await googleRegistrationOnSuccess(code)
			}
		},
	})

	/**
	 * Function handler that will be called when you click on the authorization
	 * button through Google.
	 */
	async function clickHandler() {
		// Call a pop-up window to authorization using Google.
		googlePopup()
	}

	return <KuuiGoogleAuth onClick={clickHandler} {...props} />
}
