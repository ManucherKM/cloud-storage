export interface IResponseCreateOtp {
	success: true
}

export interface IResponseVerificationOtp {
	accessToken: string
}

export interface IResponseChangePassword {
	success: string
}

export interface IRestoreAccountStore {
	email: string
	setEmail: (email: string) => void
	createOtp: () => Promise<boolean>
	verificationOtp: (otp: number) => Promise<boolean>
	changePassword: (password: string) => Promise<boolean>
}

export enum ERestoreAccountApiRoutes {
	createOtp = '/api/restore-account',
	verificationOtp = '/api/restore-account/verification',
	changePassword = '/api/user',
}
