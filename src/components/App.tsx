import { AppRouter } from '@/components'
import { useStore } from '@/storage'
import { Loader } from 'kuui-react'
import { FC } from 'react'

import '@/assets/styles/index.scss'
import { useUserConfig } from '@/hooks'

/** The main component of the application. */
export const App: FC = () => {
	const isLoading = useStore(store => store.isLoading)
	useUserConfig()
	return (
		<>
			{isLoading && <Loader />}
			<AppRouter />
		</>
	)
}
