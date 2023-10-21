// Utils
import { from } from 'env-var'

/**
 * An object to receive environment variables.
 *
 * @example const API_URL = env.get('API_URL').required().asString()
 */
export const env = from({
	/**
	 * Google client ID for correct interaction with the api.
	 */
	GOOGLE_CLIENT_ID: import.meta.env.VITE_GOOGLE_CLIENT_ID,

	/**
	 * URL required to interact with the API.
	 */
	API_URL: import.meta.env.VITE_API_URL,

	/**
	 * Site key for correct work with hCaptcha.
	 */
	HCAPTCHA_SITEKEY: import.meta.env.VITE_HCAPTCHA_SITEKEY,

	/**
	 * VK client ID for correct work with the API.
	 */
	VK_CLIENT_ID: import.meta.env.VITE_VK_CLIENT_ID,

	/**
	 * The URL where the web application is hosted.
	 */
	CLIENT_URL: import.meta.env.VITE_CLIENT_URL,
})
