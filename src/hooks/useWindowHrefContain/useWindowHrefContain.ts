// Utils
import { useEffect, useState } from 'react'

/**
 * Use this hook to check if a user's URL contains a specific string.
 * @param str the string that will be used for searches.
 */
export function useWindowHrefContain(str: string) {
	/**
	 * The state of the user's current URL.
	 */
	const [href, setHref] = useState<string>(window.location.href)

	// Each time the user's URL changes, a specific callback will be processed.
	useEffect(() => {
		// We change the state.
		setHref(window.location.href)
	}, [window.location.href])

	return href.includes(str)
}
