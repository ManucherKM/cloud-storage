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

instance.interceptors.request.use(config => {
	const token = useAuthStore.getState().token || ''
	config.headers.Authorization = getAuthorization(token)
	return config
})

instance.interceptors.response.use(
	config => config,
	async error => {
		const originalRequest = error.config
		if (
			error.response.status === 403 &&
			error.config &&
			!error.config.isRestry
		) {
			originalRequest.isRestry = true
			try {
				await useAuthStore.getState().getNewAccessToken()
				return instance.request(originalRequest)
			} catch (e) {
				console.error(e)
			}
		}
		throw error
	},
)

export default instance
