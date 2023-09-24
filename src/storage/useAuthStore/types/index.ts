/** The interface of parameters that the `login` function accepts. */
export interface ILoginTarget {
	email: string
	password: string
	token: string
}

/**
 * The interface of parameters returned by the server when using the `login`
 * function.
 */
export interface ILoginResponse {
	accessToken: string
}

/** The interface of parameters that the `registration` function accepts. */
export interface IRegistrationTarget {
	email: string
	password: string
	token: string
}

/**
 * The interface of parameters returned by the server when using the
 * `registration` function.
 */
export interface IRegistrationResponse {
	success: boolean
}

/**
 * The interface of parameters returned by the server when using the
 * `loginWithGoogle` function.
 */

export interface ILoginWithGoogleResponse {
	accessToken: string
}

/**
 * The interface of parameters returned by the server when using the
 * `registrationWithGoogle` function.
 */
export interface IRegistrationWithGoogleResponse {
	success: boolean
}

/**
 * The interface of parameters returned by the server when using the
 * `loginWithVK` function.
 */

export interface ILoginWithVKResponse {
	accessToken: string
}

/**
 * The interface of parameters returned by the server when using the
 * `registrationWithVK` function.
 */
export interface IRegistrationWithVKResponse {
	success: boolean
}

export interface ILogoutResponse {
	success: boolean
}

/** Interface to the authorization store. */
export interface IAuthStore {
	token: null | string
	login: (loginDto: ILoginTarget) => Promise<boolean>
	registration: (registrationDto: IRegistrationTarget) => Promise<boolean>
	registrationWithGoogle: (code: string) => Promise<boolean>
	loginWithGoogle: (code: string) => Promise<boolean>
	registrationWithVk: (code: string, redirectUri: string) => Promise<boolean>
	loginWithVK: (code: string, redirectUri: string) => Promise<boolean>
	logout: () => Promise<boolean>
}

/** Routes for api requests to the authorization store. */
export enum EUseAuthStoreApiRoutes {
	login = '/api/auth/login',
	registration = '/api/auth/registration',
	loginWithGoogle = '/api/auth/login/google',
	registrationWithGoogle = '/api/auth/registration/google',
	registrationWithVK = '/api/auth/registration/vk',
	loginWithVK = '/api/auth/login/vk',
	logout = 'api/auth/logout',
}
