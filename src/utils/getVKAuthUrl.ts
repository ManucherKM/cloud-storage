// Types
import type { IRedirectVKAuthTarget } from '@/hooks'

/** Interface for the incoming parameters of the `getVKAuthUrl` function. */
export interface IGetVKAuthUrl extends IRedirectVKAuthTarget {}

/** Parameter interface for authorization in VK. */
export interface IVKAuthParams extends URLSearchParams {
	client_id: string
	redirect_uri: string
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

	return `https://oauth.vk.com/authorize?${formatedParams}`
}
