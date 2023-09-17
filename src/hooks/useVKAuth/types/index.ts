export enum EVKAuthDisplay {
	page = 'page',
	popup = 'popup',
}

export interface IUseVKAuthError {
	error: string | null
	errorDescription: string | null
}

export interface IUseVKAuthTarget {
	clientId: string
	redirectUri: string
	display: `${EVKAuthDisplay}`
}
