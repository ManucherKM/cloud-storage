/** Notification options interface. */
export enum ENotificationVariant {
	/** Variant message. Tells the user some information. */
	message = 'message',

	/** Variant error. Notifies the user of any error. */
	error = 'error',
}

/** Notification interface. */
export interface INotification {
	/** Notification variant. */
	variant: `${ENotificationVariant}`

	/** Notification text. */
	text: string
}

/** Notification type */
export type Notification = INotification | never

/** Notification storage interface. */
export interface INotificationsStore {
	/** Notifications. */
	notifications: Notification[]

	/**
	 * Function to generate error notification.
	 *
	 * @param text Notifications text
	 */
	newError: (text: string) => void

	/**
	 * Function to generate message notification.
	 *
	 * @param text Notifications text
	 */
	newMessage: (text: string) => void

	/**
	 * Function to remove notification.
	 *
	 * @param notification The notification that needs to be deleted.
	 */
	removeNotification: (notification: INotification) => void

	/** Function to reset the storage to its initial state. */
	reset: () => void
}
