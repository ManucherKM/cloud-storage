import axios from 'axios'

// Getting the URL for API requests.
const url = import.meta.env.VITE_API_URL

// Set the base URL for axios.
const instance = axios.create({
	baseURL: url,
})

export default instance
