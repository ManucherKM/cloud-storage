// Utils
import { env } from '../configuration/env'

/**
 * URL required to interact with the API.
 */
const API_URL = env.get('API_URL').required().asString()

/**
 * Using this function, you can get a link to an image in the user's storage.
 * @param fileName Name of the image file.
 */
export function getImageUrl(fileName: string) {
	return `${API_URL}/uploads/${fileName}`
}
