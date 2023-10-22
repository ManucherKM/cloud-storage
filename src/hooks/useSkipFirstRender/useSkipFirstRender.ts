// Utils
import { useEffect, useState } from 'react'

/** Use this hook to skip the first render. */
export function useSkipFirstRender() {
	/** State for the first rendering. */
	const [isFirstRender, setIsFirstRender] = useState<boolean>(true)

	/** Handler function that changes the value of the first render. */
	const changeIsFirstRenderHandler = () => {
		// If it was the first rendering.
		if (isFirstRender) {
			// Change the state of the renderer.
			setIsFirstRender(false)
		}
	}

	// Call the changeIsFirstRenderHandler function on the first render.
	useEffect(changeIsFirstRenderHandler, [])

	// Return a boolean value.
	return isFirstRender
}
