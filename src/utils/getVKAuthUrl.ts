// Types
import type { IRedirectVKAuthTarget } from '@/hooks'

/** Interface for the incoming parameters of the `getVKAuthUrl` function. */
export interface IGetVKAuthUrl extends IRedirectVKAuthTarget {}

/** Parameter interface for authorization in VK. */
export interface IVKAuthParams extends URLSearchParams {
	/** VK client id for correct work with the VK API. */
	client_id: string

	/** VK redirect URI for correct work with the VK API. */
	redirect_uri: string

	/** The type of display that will be shown to the user for authorization. */
	display: string
}

/** With this function you can get VK URL for authorization by Code flow method. */
export function getVKAuthUrl(target: IGetVKAuthUrl) {
	// Parameters object for the request.
	const params = new URLSearchParams({
		client_id: target.clientId,
		display: target.display,
		redirect_uri: target.redirectUri,
	} as IVKAuthParams)

	// Parameters for the request.
	const formatedParams = params.toString()

	// We return the URL for authorization in VK.
	return `https://oauth.vk.com/authorize?${formatedParams}`
}
