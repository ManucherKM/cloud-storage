/** Server response interface for creating a one-time password. */
export interface IResponseCreateOtp {
	/** The result of the request. */
	success: true
}

/** Server response interface for one-time password verification. */
export interface IResponseVerificationOtp {
	/** User access token. */
	accessToken: string
}

/** Interface for server response to password changes. */
export interface IResponseChangePassword {
	/** The result of the request. */
	success: string
}

/** Restore account store interface */
export interface IRestoreAccountStore {
	/** Email to restore your account. */
	email: string

	/**
	 * The value with which the email from the storage will be replaced.
	 *
	 * @param email
	 */
	setEmail: (email: string) => void

	/** Function for creating a one-time password. */
	createOtp: () => Promise<boolean>

	/** Function for verification a one-time password. */
	verificationOtp: (otp: number) => Promise<boolean>

	/**
	 * Function for changing account password.
	 *
	 * @param password New password specified by the user.
	 */
	changePassword: (password: string) => Promise<boolean>
}

/** Routes for api requests to the restore account store. */
export enum ERestoreAccountApiRoutes {
	/** Route for creating a one-time password. */
	createOtp = '/api/restore-account',

	/** Route for one-time password verification. */
	verificationOtp = '/api/restore-account/verification',

	/** Route for changing the user password. */
	changePassword = '/api/user',
}
