// Types
import type { IColorTheme } from 'kuui-react'

/** Interface of the server response object when requesting color themes. */
export interface IGetThemesResponse {
	/** Color themes. */
	themes: IColorTheme[]
}

/** Interface of the server response object when updating the user configuration. */
export interface IUpdateConfigResponse {
	/** The result of the request. */
	success: boolean
}

/** Interface of the server response object when creating a user configuration. */
export interface ICreateConfigResponse {
	/** The result of the request. */
	success: boolean
}

/** User configuration interface. */
export interface IConfig {
	/** Rounding the corners of elements. */
	round: string

	/** Color theme. */
	theme: IColorTheme
}

/** Config storage interface. */
export interface IConfigStore {
	/** Color theme. */
	themes: IColorTheme[]

	/** User config */
	config: IConfig | null

	/** Function to get available color themes. */
	getThemes: () => Promise<boolean>

	/**
	 * Function for updating the user config.
	 *
	 * @param round Rounding the corners of elements.
	 * @param themeId Color theme.
	 */
	updateConfig: (round?: string, themeId?: string) => Promise<boolean>

	/**
	 * Function for create the user config.
	 *
	 * @param round Rounding the corners of elements.
	 * @param themeId Color theme.
	 */
	createConfig: (round?: string, themeId?: string) => Promise<boolean>

	/** Function for getting user config. */
	getConfig: () => Promise<boolean>

	/** Function to reset the storage to its initial state. */
	reset: () => void
}

/** Routes for api requests to the config store. */
export enum EConfigStoreApiRoutes {
	/** Route to get a list of color themes. */
	getThemes = '/api/theme/all',

	/** Route for managing user config (create, update). */
	configManagement = '/api/config',
}
