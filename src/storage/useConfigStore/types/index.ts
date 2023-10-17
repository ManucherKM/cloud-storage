import { ITheme } from 'kuui-react/dist/components/ColorThemes/ColorThemes'

export interface IGetThemesResponse {
	themes: ITheme[]
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
	themes: ITheme[]
	config: IConfig | null
	getThemes: () => Promise<boolean>
	updateConfig: (round: string, themeId: string) => Promise<boolean>
	createConfig: (round: string, themeId: string) => Promise<boolean>
	getConfig: () => Promise<boolean>
	reset: () => void
}

export enum EConfigStoreApiRoutes {
	getThemes = '/api/theme',
	updateConfig = '/api/config',
	createConfig = '/api/config',
	getConfig = '/api/config',
}
