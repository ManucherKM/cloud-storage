/**
 * Using this function, you will receive a valid "Authorization" field using an
 * access token for this.
 *
 * @param token Authorization token.
 * @returns The value for the authorization field.
 */
export function getAuthorization(token: string) {
	// Return the value for the authorization field.
	return `Bearer ${token}`
}
