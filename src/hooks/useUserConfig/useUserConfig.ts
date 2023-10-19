import { useAuthStore, useConfigStore, useStore } from '@/storage'
import { changeRound, changeTheme } from 'kuui-react'
import { useEffect } from 'react'

export async function useUserConfig() {
	const config = useConfigStore(store => store.config)
	const getConfig = useConfigStore(store => store.getConfig)
	const isAuth: boolean = !!useAuthStore(store => store.token)
	const setLoading = useStore(store => store.setLoading)

	useEffect(() => {
		if (isAuth) {
			setLoading(true)
			getConfig().finally(() => setLoading(false))
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
