import { AlertError, AlertMessage, List } from '@/components'
import { useNotificationsStore } from '@/storage'
import {
	ENotificationVariant,
	INotification,
} from '@/storage/useNotificationsStore/types'
import { FC } from 'react'

export const AppNotifications: FC = () => {
	const notifications = useNotificationsStore(store => store.notifications)
	const removeNotification = useNotificationsStore(
		store => store.removeNotification,
	)

	function notificationTimeUp(notification: INotification) {
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
