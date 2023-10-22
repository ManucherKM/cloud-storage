// Utils
import { useAuthStore, useConfigStore, useStore } from '@/storage'
import { changeRound, changeTheme } from 'kuui-react'
import { useEffect } from 'react'

/** Using this hook, you can give the application a custom configuration. */
export async function useUserConfig() {
	/** User configuration. */
	const config = useConfigStore(store => store.config)

	/** Function for receiving user configuration from the server. */
	const getConfig = useConfigStore(store => store.getConfig)

	/** The state responsible for user authorization. */
	const isAuth: boolean = !!useAuthStore(store => store.token)

	/** A function with which we can specify when to display Loader. */
	const setLoading = useStore(store => store.setLoading)

	/** A function that will be executed every time the `isAuth` value changes. */
	const authHandler = () => {
		// If the user is not authorized, stops executing the function.
		if (!isAuth) return

		// 	Show Loader.
		setLoading(true)

		// When executing the promise returned by the `getConfig` function, we remove Loader.
		getConfig().finally(() => setLoading(false))
	}

	// Each time the "isAuth" value changes, we call the specified callback.
	useEffect(authHandler, [isAuth])

	/** A function that will be executed every time the `config` value changes. */
	const configHandler = () => {
		// If the config is not specified, we stop executing the function.
		if (!config) return

		// If a rounding is specified, change it.
		if (config.round) {
			changeRound(config.round + 'px')
		}

		// If a color theme is specified, change it.
		if (Object.values(config.theme).length) {
			changeTheme(config.theme)
		}
	}

	// Each time the "config" value changes, we call the specified callback.
	useEffect(configHandler, [config])
}
