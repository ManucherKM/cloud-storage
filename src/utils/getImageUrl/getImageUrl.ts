// Utils
// import { env } from '../../configuration/env'

// Get the URL to interact with the API.
const API_URL = import.meta.env.VITE_API_URL

/**
 * Using this function, you can get a link to an image in the user's storage.
 *
 * @param fileName Name of the image file.
 * @returns URL to the image file.
 */
export function getImageUrl(fileName: string) {
	// Return the URL to the image file.
	return `${API_URL}/uploads/${fileName}`
}
