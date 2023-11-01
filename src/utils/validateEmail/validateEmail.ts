const regex =
	/^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu

/** Function for email validation. */
export function validateEmail(email: string) {
	// We return the result of matching the password to an existing regular expression.
	return regex.test(email.toLowerCase())
}
