export enum ENotificationVariant {
	message = 'message',
	error = 'error',
}

export interface INotification {
	variant: `${ENotificationVariant}`
	text: string
}

export interface INotificationsStore {
	notifications: INotification[]
	newError: (text: string) => void
	newMessage: (text: string) => void
	removeNotification: (notification: INotification) => void
}
