const regex =
	/^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu

/** Function for email validation. */
export function validateEmail(email: string) {
	return regex.test(email.toLowerCase())
}
