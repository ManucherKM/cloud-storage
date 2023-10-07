import { from } from 'env-var'

export const env = from({
	GOOGLE_CLIENT_ID: import.meta.env.VITE_GOOGLE_CLIENT_ID,
	API_URL: import.meta.env.VITE_API_URL,
	HCAPTCHA_SITEKEY: import.meta.env.VITE_HCAPTCHA_SITEKEY,
	VK_CLIENT_ID: import.meta.env.VITE_VK_CLIENT_ID,
	CLIENT_URL: import.meta.env.VITE_CLIENT_URL,
})
