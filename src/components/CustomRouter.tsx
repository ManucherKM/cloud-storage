// Types
import type { BrowserHistory } from 'history'
import type { FC } from 'react'

// Utils
import { useLayoutEffect, useState } from 'react'

// Components
import { Router, RouterProps } from 'react-router-dom'

/** Valid types for `CustomRouter`. */
export type TCustomRouter = Omit<
	RouterProps,
	'location' | 'navigationType' | 'navigator'
>

/** `CustomRouter` component interface. */
export interface ICustomRouter extends TCustomRouter {
	/** History of the router. */
	history: BrowserHistory
}

/**
 * Custom component for routing.
 *
 * @example
 * 	;<CustomRouter>
 * 		<Routes>...other code</Routes>
 * 	</CustomRouter>
 *
 * @param props Propses
 */
export const CustomRouter: FC<ICustomRouter> = ({ history, ...props }) => {
	// State for the current route.
	const [route, setRoute] = useState({
		action: history.action,
		location: history.location,
	})

	// A handler function that will be processed every time the `history` changes.
	const historyHandler = () => {
		// When the location changes, the state changes.
		history.listen(setRoute)
	}

	// Each time the "history" is named, we call the callback.
	useLayoutEffect(historyHandler, [history])

	return (
		<Router
			{...props}
			location={route.location}
			navigationType={route.action}
			navigator={history}
		/>
	)
}
