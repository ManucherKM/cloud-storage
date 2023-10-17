import { env } from '../configuration/env'

const API_URL = env.get('API_URL').required().asString()

export function getImageUrl(fileName: string) {
	return `${API_URL}/uploads/${fileName}`
}
