// Utils
import { useAuthStore, useConfigStore } from '@/storage'
import { changeRound, changeTheme } from 'kuui-react'
import { useEffect } from 'react'
import { useLoader } from '..'

/** Using this hook, you can give the application a custom configuration. */
export async function useUserConfig() {
	// User configuration.
	const config = useConfigStore(store => store.config)

	//  Function for receiving user configuration from the server.
	const getConfig = useConfigStore(store => store.getConfig)

	// The state responsible for user authorization.
	const isAuth: boolean = !!useAuthStore(store => store.token)

	// A function for showing Loader to the user when requesting an API.
	const loader = useLoader()

	// Each time the "isAuth" value changes, we call the specified callback.
	useEffect(() => {
		// Function for getting user config.
		const fetchConfig = async () => {
			// If the user is not authorized, stops executing the function.
			if (!isAuth) return

			// When executing the promise returned by the `getConfig` function, we remove Loader.
			await loader(getConfig)
		}

		// Call the function to get the user config.
		fetchConfig()
	}, [isAuth, getConfig, loader])

	// Each time the "config" value changes, we call the specified callback.
	useEffect(() => {
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
	}, [config])
}
