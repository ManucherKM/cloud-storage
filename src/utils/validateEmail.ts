const regex =
	/^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu

/** You can use this feature to perform email validation. */
export function validateEmail(email: string) {
	return regex.test(email.toLowerCase())
}
