// Types
import type { IGoogleAuth as IKuuiGoogleAuth } from 'kuui-react'
import type { FC } from 'react'

// Utils
import { ERoutes } from '@/configuration/routes'
import { useLoader } from '@/hooks'
import { useAuthStore, useNotificationsStore } from '@/storage'
import { useGoogleLogin } from '@react-oauth/google'
import { useNavigate } from 'react-router'
import { EGoogleAuthVariant } from './types'

// Components
import { GoogleAuth as KuuiGoogleAuth } from 'kuui-react'

/** Valid types for the `GoogleAuth` component */
export type TGoogleAuth = Omit<IKuuiGoogleAuth, 'onClick'>

/** `GoogleAuth` component interface. */
export interface IGoogleAuth extends TGoogleAuth {
	/** Component logic. */
	logics: `${EGoogleAuthVariant}`
}

/**
 * Component for authorization using Google.
 *
 * @param props Propses
 */
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
		// We receive the result of the request to the server.
		const isSuccess = await loader(loginWithGoogle, code)

		// If the result is unsuccessful.
		if (!isSuccess) {
			// Show the user an error message.
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
			// Show the user an error message.
			newError('Failed to register.')

			// Stop further execution of the function.
			return
		}

		// We redirect the user to the authorization page.
		navigate(ERoutes.login)
	}

	// Function to bring up a popup window for authorization via Google.
	const googlePopup = useGoogleLogin({
		// Verification method.
		flow: 'auth-code',

		// Error handler.
		onError: console.error,

		// Success handler.
		onSuccess: async ({ code }) => {
			// If login was selected.
			if (logics === EGoogleAuthVariant.login) {
				// Call the login function.
				return await googleLoginOnSuccess(code)
			}
			// If registration was selected.
			else if (logics === EGoogleAuthVariant.registration) {
				// Call the registration function.
				return await googleRegistrationOnSuccess(code)
			}
		},
	})

	// Function handler that will be called when you click on the authorization button through Google.
	async function clickHandler() {
		// Call a pop-up window to authorization using Google.
		googlePopup()
	}

	return <KuuiGoogleAuth onClick={clickHandler} {...props} />
}
