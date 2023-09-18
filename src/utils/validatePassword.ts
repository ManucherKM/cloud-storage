const regex = new RegExp(
	'^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_])(?=.{8,32}$)',
)
/** You can use this function to perform password validation. */
export function validatePassword(password: string) {
	return regex.test(password)
}
