export interface ILoginDto {
	email: string
	password: string
	token: string
}

export interface ILoginResponse {
	accessToken: string
}

export interface IRegistrationDto {
	email: string
	password: string
	token: string
}

export interface IRegistrationResponse {
	success: boolean
}

export interface IRegistrationWithGoogleResponse {
	success: boolean
}

export interface ILoginWithGoogleResponse {
	accessToken: string
}

export interface IAuthStore {
	token: null | string
	login: (loginDto: ILoginDto) => Promise<boolean>
	registration: (registrationDto: IRegistrationDto) => Promise<boolean>
	registrationWithGoogle: (code: string) => Promise<boolean>
	loginWithGoogle: (code: string) => Promise<boolean>
}

export enum EUseAuthStoreApiRoutes {
	login = '/api/auth/login',
	registration = '/api/auth/registration',
	loginWithGoogle = '/api/auth/login/google',
	registrationWithGoogle = '/api/auth/registration/google',
}
