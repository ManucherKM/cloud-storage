/**
 *
 * Using this function, you will receive a valid "Authorization" field using an access token for this.
 *
 * @param token Authorization token.
 */
export function getAuthorization(token: string) {
	return `Bearer ${token}`
}
