import axios from 'axios'
import { env } from './env'

// Getting the URL for API requests.
const API_URL = env.get('API_URL').required().asString()

// Set the base URL for axios.
const instance = axios.create({
	baseURL: API_URL,
})

export default instance
