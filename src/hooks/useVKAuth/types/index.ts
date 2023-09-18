/** Display field interface for authorization via VK. */
export enum EVKAuthDisplay {
	page = 'page',
	popup = 'popup',
}

/** The error return interface of the `useVKAuth` hook. */
export interface IUseVKAuthError {
	error: string | null
	errorDescription: string | null
}

/** Interface for the incoming parameters of the `redirectToVkAuthPage` function. */
export interface IRedirectVKAuthTarget {
	clientId: string
	redirectUri: string
	display: `${EVKAuthDisplay}`
}
