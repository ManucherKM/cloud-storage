import { IUseVKAuthTarget } from '../types'

export interface IGetVKAuthUrl extends IUseVKAuthTarget {}

export function getVKAuthUrl(target: IGetVKAuthUrl) {
	return `https://oauth.vk.com/authorize?client_id=${target.clientId}&redirect_uri=${target.redirectUri}&display=${target.display}`
}
