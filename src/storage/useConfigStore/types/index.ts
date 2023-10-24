import { IColorTheme } from 'kuui-react'

export interface IGetThemesResponse {
	themes: IColorTheme[]
}

export interface IUpdateConfigResponse {
	success: boolean
}

export interface ICreateConfigResponse {
	success: boolean
}

export interface IConfig {
	round: string
	theme: {
		id: string
		black1000: string
		black500: string
		dominant1: string
		black250: string
		dominant2: string
		warning: string
	}
}

export interface IConfigStore {
	themes: IColorTheme[]
	config: IConfig | null
	getThemes: () => Promise<boolean>
	updateConfig: (round: string, themeId: string) => Promise<boolean>
	createConfig: (round: string, themeId: string) => Promise<boolean>
	getConfig: () => Promise<boolean>
	reset: () => void
}

export enum EConfigStoreApiRoutes {
	getThemes = '/api/theme/all',

	configManagement = '/api/config',
}
