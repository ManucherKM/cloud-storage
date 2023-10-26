// Types
import type { INotification } from '@/storage/useNotificationsStore/types'
import type { FC } from 'react'

// Components
import { AlertError, AlertMessage, List } from '@/components'

// Utils
import { useNotificationsStore } from '@/storage'
import { ENotificationVariant } from '@/storage/useNotificationsStore/types'

/** The component responsible for rendering notifications. */
export const AppNotifications: FC = () => {
	// Notifications.
	const notifications = useNotificationsStore(store => store.notifications)

	// Function to remove notification
	const removeNotification = useNotificationsStore(
		store => store.removeNotification,
	)

	// A handler function that deletes a notification when its time expires.
	function notificationTimeUp(notification: INotification) {
		// We delete the notification from the storage.
		removeNotification(notification)
	}

	return (
		<List
			arr={notifications}
			callback={n => {
				if (n.variant === ENotificationVariant.message) {
					return (
						<AlertMessage
							key={n.text}
							message={n.text}
							onTimeUp={() => notificationTimeUp(n)}
						/>
					)
				}

				if (n.variant === ENotificationVariant.error) {
					return (
						<AlertError
							key={n.text}
							error={n.text}
							onTimeUp={() => notificationTimeUp(n)}
						/>
					)
				}
			}}
		/>
	)
}
