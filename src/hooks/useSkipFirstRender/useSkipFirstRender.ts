// Utils
import { useEffect, useState } from 'react'

/** Use this hook to skip the first render. */
export function useSkipFirstRender() {
	//  State for the first rendering.
	const [isFirstRender, setIsFirstRender] = useState<boolean>(true)

	// Call the callback on the first render.
	useEffect(() => {
		// If it was the first rendering.
		if (isFirstRender) {
			// Change the state of the renderer.
			setIsFirstRender(false)
		}
	}, [isFirstRender])

	// Return a boolean value.
	return isFirstRender
}
