import { env } from '@/configuration/env'
import { ERoutes } from '@/configuration/routes'
import { redirectToVkAuthPage, useLoader, useVKAuth } from '@/hooks'
import { useAuthStore, useNotificationsStore } from '@/storage'
import { IVKAuth as IKuuiVKAuth, VKAuth as KuuiVKAuth } from 'kuui-react'
import { FC, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router'

export enum EVKAuthVariant {
	login = 'login',
	registration = 'registration',
}

export type TVKAuth = Omit<IKuuiVKAuth, 'onClick'>

export interface IVKAuth extends TVKAuth {
	logics: `${EVKAuthVariant}`
}

/** VK client ID for correct work with the API. */
const VK_CLIENT_ID = env.get('VK_CLIENT_ID').required().asString()

/** The URL where the web application is hosted. */
const CLIENT_URL = env.get('CLIENT_URL').required().asString()

const vkRedirectUriLogin = CLIENT_URL + ERoutes.login
const vkRedirectUriRegistration = CLIENT_URL + ERoutes.registration

export const VKAuth: FC<IVKAuth> = ({ logics, ...props }) => {
	const vkRedirectUri = useRef<string>(
		logics === EVKAuthVariant.login
			? vkRedirectUriLogin
			: vkRedirectUriRegistration,
	)

	const loginWithVK = useAuthStore(store => store.loginWithVK)

	const registrationWithVK = useAuthStore(store => store.registrationWithVk)

	// Function to create a new error to show it to the user.
	const newError = useNotificationsStore(store => store.newError)

	// A function for showing Loader to the user when requesting an API.
	const loader = useLoader()

	/** With this feature, you can redirect the user to another route. */
	const navigate = useNavigate()

	// State with authorization juice for VK.
	const [VKUserCode] = useVKAuth()

	/**
	 * Function handler that will be called when you click on the authorization
	 * button through VK.
	 */
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

		/** Function for sending data of a user who authorization via VK to API. */
		const fetchDataToApi = async () => {
			const isSuccess = await loader(
				logics === EVKAuthVariant.login ? loginWithVK : registrationWithVK,
				VKUserCode,
				vkRedirectUri.current,
			)

			// If the result is unsuccessful.
			if (!isSuccess) {
				newError('Failed to authorization by VK.')

				// Stop further execution of the function.
				return
			}

			// We redirect the user to the storage page.
			navigate(
				logics === EVKAuthVariant.login ? ERoutes.storage : ERoutes.login,
			)
		}

		fetchDataToApi()
	}, [VKUserCode, loginWithVK, navigate])
	return <KuuiVKAuth onClick={vkAuthHandler} {...props} />
}
