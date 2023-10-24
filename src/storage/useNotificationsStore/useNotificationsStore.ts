import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import {
	ENotificationVariant,
	INotification,
	INotificationsStore,
} from './types'

const defaultNotificationsStore = {
	notifications: [],
}

export const useNotificationsStore = create(
	persist<INotificationsStore>(
		(set, get) => ({
			...defaultNotificationsStore,
			newMessage(text) {
				const message: INotification = {
					text,
					variant: ENotificationVariant.message,
				}

				set(prev => ({ notifications: [...prev.notifications, message] }))
			},
			newError(text) {
				const error: INotification = {
					text,
					variant: ENotificationVariant.error,
				}

				set(prev => ({ notifications: [...prev.notifications, error] }))
			},
			removeNotification(notification) {
				const { notifications } = get()

				const newNotifications = notifications.filter(
					n =>
						n.text !== notification.text && n.variant === notification.variant,
				)

				set({ notifications: newNotifications })
			},
			reset() {
				set(defaultNotificationsStore)
			},
		}),
		{ name: 'notifications-store' },
	),
)
