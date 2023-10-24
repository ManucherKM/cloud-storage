// Utils
import { history } from '@/configuration/history'
import { useEffect, useState } from 'react'

/**
 * Use this hook to check if a user's URL contains a specific string.
 *
 * @param str The string that will be used for searches.
 */
export function useRouteContain(str: string) {
	//  The state of the user's current URL.
	const [route, setRoute] = useState<string>(history.location.pathname)

	// Call the callback when rendering.
	useEffect(() => {
		// We change the state.
		setRoute(history.location.pathname)
	}, [])

	return route.includes(str)
}
