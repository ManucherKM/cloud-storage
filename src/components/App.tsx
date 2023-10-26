// Types
import type { FC } from 'react'

// Components
import { AppNotifications, AppRouter } from '@/components'
import { Loader } from 'kuui-react'

// Utils
import { useUserConfig } from '@/hooks'
import { useStore } from '@/storage'

// Styles
import '@/assets/styles/index.scss'

/**
 * The main component of the application.
 *
 * @example
 * 	;<App />
 */
export const App: FC = () => {
	// Loading state.
	const isLoading = useStore(store => store.isLoading)

	// Hook for using custom configuration.
	useUserConfig()
	return (
		<>
			{isLoading && <Loader />}
			<AppNotifications />
			<AppRouter />
		</>
	)
}
