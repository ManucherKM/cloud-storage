const regex = new RegExp(
	'^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_])(?=.{8,32}$)',
)
/** Function for password validation. */
export function validatePassword(password: string) {
	return regex.test(password)
}
