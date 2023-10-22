// Utils
import { useEffect, useState } from 'react'

/**
 * Use this hook to check if a user's URL contains a specific string.
 *
 * @param str The string that will be used for searches.
 */
export function useWindowHrefContain(str: string) {
	/** The state of the user's current URL. */
	const [href, setHref] = useState<string>(window.location.href)

	/**
	 * A handler function that will be processed every time the user’s URL
	 * changes.
	 */
	const hrefHandler = () => {
		// We change the state.
		setHref(window.location.href)
	}

	// Each time the user's URL changes, a specific callback will be processed.
	useEffect(hrefHandler, [window.location.href])

	return href.includes(str)
}
