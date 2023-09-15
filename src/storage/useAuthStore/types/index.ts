import { CodeResponse } from '@react-oauth/google'

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

export interface IRegistrationWithGoogleDto {}

export interface IAuthStore {
	token: null | string
	login: (loginDto: ILoginDto) => Promise<boolean>
	registration: (registrationDto: IRegistrationDto) => Promise<boolean>
	registrationWithGoogle: (
		res: Omit<CodeResponse, 'error' | 'error_description' | 'error_uri'>,
	) => void
}

export enum EUseAuthStoreApiRoutes {
	login = '/api/auth/login',
	registration = '/api/auth/registration',
}
