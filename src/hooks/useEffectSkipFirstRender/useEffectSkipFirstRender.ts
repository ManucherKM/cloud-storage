// Types
import type { DependencyList, EffectCallback } from 'react'

// Utils
import { useEffect } from 'react'
import { useSkipFirstRender } from '../useSkipFirstRender/useSkipFirstRender'

/**
 * Use this hook instead of `useEffect` if you want to skip the first render.
 *
 * @param effect Imperative function that can return a cleanup function
 * @param deps If present, effect will only activate if the values in the list
 *   change.
 */
export function useEffectSkipFirstRender(
	effect: EffectCallback,
	deps?: DependencyList,
) {
	/** The value of the first rendering. */
	const isFirstRender = useSkipFirstRender()

	/** Handler function that skips the first render and calls `effect`. */
	const firstRenderHandler = () => {
		if (isFirstRender) return
		effect()
	}

	// Call the `firstRenderHandler` function and specify the `dependencies`.
	useEffect(firstRenderHandler, deps)
}
