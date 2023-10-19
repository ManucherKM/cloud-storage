import { IRedirectVKAuthTarget } from '@/hooks'

/** Interface for the incoming parameters of the `getVKAuthUrl` function. */
export interface IGetVKAuthUrl extends IRedirectVKAuthTarget {}

/** With this function you can get VK URL for authorization by Code flow method. */
export function getVKAuthUrl(target: IGetVKAuthUrl) {
	return `https://oauth.vk.com/authorize?client_id=${target.clientId}&redirect_uri=${target.redirectUri}&display=${target.display}`
}
