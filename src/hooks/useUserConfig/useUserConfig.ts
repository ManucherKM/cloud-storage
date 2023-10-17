import { useAuthStore } from '@/storage'
import { useConfigStore } from '@/storage/useConfigStore/useConfigStore'
import { changeRound, changeTheme } from 'kuui-react'
import { useEffect } from 'react'

export async function useUserConfig() {
	const config = useConfigStore(store => store.config)
	const getConfig = useConfigStore(store => store.getConfig)
	const isAuth: boolean = !!useAuthStore(store => store.token)

	useEffect(() => {
		if (isAuth) {
			getConfig()
		}
	}, [isAuth])

	useEffect(() => {
		if (!config) {
			return
		}
		if (config.round) {
			changeRound(config.round + 'px')
		}

		if (Object.values(config.theme).length) {
			changeTheme(config.theme)
		}
	}, [config])
}