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

export interface IAuthStore {
	token: null | string
	login: (loginDto: ILoginDto) => Promise<string | undefined>
	registration: (registrationDto: IRegistrationDto) => Promise<boolean>
}
