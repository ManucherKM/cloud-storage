import { AppRouter } from '@/components'
import { FC } from 'react'
import { useAuthStore, useStore } from '@/storage'
import { Loader, NotFound } from 'kuui-react'

import '@/assets/styles/index.scss'

/** The main component of the application. */
export const App: FC = () => {
	const isLoading = useStore(store => store.isLoading)
	return (
		<>
			{isLoading && <Loader />}
			<AppRouter />
		</>
	)
}
