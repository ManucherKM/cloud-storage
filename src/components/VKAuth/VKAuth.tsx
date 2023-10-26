// Types
import type { IVKAuth as IKuuiVKAuth } from 'kuui-react'
import type { FC } from 'react'

// Utils
import { env } from '@/configuration/env'
import { ERoutes } from '@/configuration/routes'
import { redirectToVkAuthPage, useLoader, useVKAuth } from '@/hooks'
import { useAuthStore, useNotificationsStore } from '@/storage'
import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router'
import { EVKAuthVariant } from './types'

// Components
import { VKAuth as KuuiVKAuth } from 'kuui-react'

/** Valid types for the `VKAuth` component */
export type TVKAuth = Omit<IKuuiVKAuth, 'onClick'>

/** `VKAuth` component interface. */
export interface IVKAuth extends TVKAuth {
	/** Component logic. */
	logics: `${EVKAuthVariant}`
}

// VK client ID for correct work with the API.
const VK_CLIENT_ID = env.get('VK_CLIENT_ID').required().asString()

// The URL where the web application is hosted.
const CLIENT_URL = env.get('CLIENT_URL').required().asString()

// Redirect URI for login
const vkRedirectUriLogin = CLIENT_URL + ERoutes.login

// Redirect URI for registration
const vkRedirectUriRegistration = CLIENT_URL + ERoutes.registration

/**
 * Component for authorization using VK.
 *
 * @param props Propses
 */
export const VKAuth: FC<IVKAuth> = ({ logics, ...props }) => {
	// Redirect URI for correct work with the VK API.
	const vkRedirectUri = useRef<string>(
		logics === EVKAuthVariant.login
			? vkRedirectUriLogin
			: vkRedirectUriRegistration,
	)

	// Function for requesting API for authorization.
	const loginWithVK = useAuthStore(store => store.loginWithVK)

	// Function for requesting API for registration.
	const registrationWithVK = useAuthStore(store => store.registrationWithVk)

	// Function to create a new error to show it to the user.
	const newError = useNotificationsStore(store => store.newError)

	// A function for showing Loader to the user when requesting an API.
	const loader = useLoader()

	//  With this feature, you can redirect the user to another route.
	const navigate = useNavigate()

	// State with authorization juice for VK.
	const [VKUserCode] = useVKAuth()

	// Function handler that will be called when you click on the authorization button through VK.
	function vkAuthHandler() {
		// We redirect the user to the page for authorization via VK.
		redirectToVkAuthPage({
			clientId: VK_CLIENT_ID,
			redirectUri: vkRedirectUri.current,
			display: 'page',
		})
	}

	// Every time the VKUserCode changes, the callback is called.
	useEffect(() => {
		// If the code for registration via VK does not exist.
		if (!VKUserCode) {
			// Stop further execution of the function.
			return
		}

		//  Function for sending data of a user who authorization via VK to API.
		const sendDataToApi = async () => {
			// Result of the API request.
			const isSuccess = await loader(
				logics === EVKAuthVariant.login ? loginWithVK : registrationWithVK,
				VKUserCode,
				vkRedirectUri.current,
			)

			// If the result is unsuccessful.
			if (!isSuccess) {
				// Show the user an error message.
				newError('Failed to authorization by VK.')

				// Stop further execution of the function.
				return
			}

			// We redirect the user to the storage page.
			navigate(
				logics === EVKAuthVariant.login ? ERoutes.storage : ERoutes.login,
			)
		}

		//Send data to API.
		sendDataToApi()
	}, [
		VKUserCode,
		loginWithVK,
		navigate,
		logics,
		newError,
		registrationWithVK,
		loader,
	])

	return <KuuiVKAuth onClick={vkAuthHandler} {...props} />
}
