/** The interface of parameters that the `login` function accepts. */
export interface ILoginTarget {
	/** Email. */
	email: string

	/** Password. */
	password: string

	/** HCaptcha token. */
	token: string
}

/**
 * The interface of parameters returned by the server when using the `login`
 * function.
 */
export interface ILoginResponse {
	/** User access token. */
	accessToken: string
}

/** The interface of parameters that the `registration` function accepts. */
export interface IRegistrationTarget {
	/** Email. */
	email: string

	/** Password. */
	password: string

	/** HCaptcha token. */
	token: string
}

/**
 * The interface of parameters returned by the server when using the
 * `registration` function.
 */
export interface IRegistrationResponse {
	/** The result of the request. */
	success: boolean
}

/**
 * The interface of parameters returned by the server when using the
 * `loginWithGoogle` function.
 */

export interface ILoginWithGoogleResponse {
	/** User access token. */
	accessToken: string
}

/**
 * The interface of parameters returned by the server when using the
 * `registrationWithGoogle` function.
 */
export interface IRegistrationWithGoogleResponse {
	/** The result of the request. */
	success: boolean
}

/**
 * The interface of parameters returned by the server when using the
 * `loginWithVK` function.
 */
export interface ILoginWithVKResponse {
	/** User access token. */
	accessToken: string
}

/**
 * The interface of parameters returned by the server when using the
 * `registrationWithVK` function.
 */
export interface IRegistrationWithVKResponse {
	/** The result of the request. */
	success: boolean
}

/** API response object interface when logging out. */
export interface ILogoutResponse {
	/** The result of the request. */
	success: boolean
}

/** API response object interface when receiving a new access token. */
export interface IGetNewAccessTokenResponse {
	/** User access token. */
	accessToken: string
}

/** Access token type. */
export type Token = string | null

/** Interface to the authorization store. */
export interface IAuthStore {
	/** User access token. */
	token: Token

	/**
	 * User authorization function.
	 *
	 * @param loginDto Parameters required to send a request to the API.
	 */
	login: (loginDto: ILoginTarget) => Promise<boolean>

	/**
	 * User registration function.
	 *
	 * @param registrationDto Parameters required to send a request to the API.
	 */
	registration: (registrationDto: IRegistrationTarget) => Promise<boolean>

	/**
	 * Google registration function.
	 *
	 * @param code Code received from Google when the user logs in.
	 */
	registrationWithGoogle: (code: string) => Promise<boolean>

	/**
	 * Google login function.
	 *
	 * @param code Code received from Google when the user logs in.
	 */
	loginWithGoogle: (code: string) => Promise<boolean>

	/**
	 * Registration function via VK.
	 *
	 * @param code Code received from VK when the user logs in.
	 * @param redirectUri The URL to which the user will be redirected upon
	 *   successful authorization.
	 */
	registrationWithVk: (code: string, redirectUri: string) => Promise<boolean>

	/**
	 * Login function via VK.
	 *
	 * @param code Code received from VK when the user logs in.
	 * @param redirectUri The URL to which the user will be redirected upon
	 *   successful authorization.
	 */
	loginWithVK: (code: string, redirectUri: string) => Promise<boolean>

	/** Function to get a new access token. */
	getNewAccessToken: () => Promise<boolean>

	/**
	 * Function to change the user's access token.
	 *
	 * @param token The value to which the access token will be changed.
	 */
	setToken: (token: Token) => void

	/** Function for logging out of a user account. */
	logout: () => Promise<boolean>

	/** Function to reset the storage to its initial state. */
	reset: () => void
}

/** Routes for api requests to the authorization store. */
export enum EAuthStoreApiRoutes {
	/** Route for user authorization. */
	login = '/api/auth/login',

	/** Route for user registration. */
	registration = '/api/auth/registration',

	/** Route for user login with Google. */
	loginWithGoogle = '/api/auth/login/google',

	/** Route for user registration with Google. */
	registrationWithGoogle = '/api/auth/registration/google',

	/** Route for user registration with VK. */
	registrationWithVK = '/api/auth/registration/vk',

	/** Route for user login with VK. */
	loginWithVK = '/api/auth/login/vk',

	/** Route to obtain a new user access token. */
	getNewAccessToken = 'api/jwt/token',

	/** Route for logging out of the user account. */
	logout = 'api/auth/logout',
}
