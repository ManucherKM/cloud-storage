// Utils
import { useStore } from '@/storage'
import { useCallback } from 'react'

/**
 * Use this hook when retrieving data from the server to display the `Loader` to
 * the user while the request is running.
 *
 * @returns The function that can be used to send requests.
 */
export function useLoader() {
	// Function for changing Loader's state.
	const setLoading = useStore(store => store.setLoading)

	return useCallback(
		async function <T, A extends unknown[]>(
			fetch: (...args: A) => Promise<T>,
			...args: A
		) {
			try {
				// Show the user Loader.
				setLoading(true)
				return await fetch(...args)
			} catch (e) {
				// If an error occurs, display it in the console.
				console.error(e)
			} finally {
				// Remove Loader.
				setLoading(false)
			}
		},
		[setLoading],
	)
}
