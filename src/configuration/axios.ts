// Utils
import { useAuthStore } from '@/storage'
import { getAuthorization } from '@/utils'
import axios from 'axios'
import { env } from './env'

// Getting the URL for API requests.
const API_URL = env.get('API_URL').required().asString()

// Set the base URL for axios.
const instance = axios.create({
	withCredentials: true,
	baseURL: API_URL,
})

// An interceptor to add an access token to each request.
instance.interceptors.request.use(config => {
	// We get the current value of the token from the storage.
	const token = useAuthStore.getState().token

	// If the token exists.
	if (token) {
		// Add it to the "Authorization" field.
		config.headers.Authorization = getAuthorization(token)
	}

	// We return the changed config.
	return config
})

// An interceptor to catch cases when the user has issued a access token.
instance.interceptors.response.use(
	config => config,
	async error => {
		// We record the original request in a variable.
		const originalRequest = error.config

		// Checking the validity of the status.
		const isValidStatus = error.response.status === 403

		// Checking for the existence of the config.
		const isConfigExist = !!error.config

		// Checking that the request is not repeated.
		const isNotRepeat = !error.config.isRestry

		if (isValidStatus && isConfigExist && isNotRepeat) {
			// We add a flag to avoid getting into an endless loop.
			originalRequest.isRestry = true
			try {
				// Get a new token.
				await useAuthStore.getState().getNewAccessToken()

				// We repeat the user's original request.
				return instance.request(originalRequest)
			} catch (e) {
				// We show the error in the console.
				console.error(e)
			}
		}

		// We forward the error to a higher level.
		throw error
	},
)

export default instance
