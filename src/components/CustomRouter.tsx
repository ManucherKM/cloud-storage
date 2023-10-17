import { BrowserHistory } from 'history'
import { FC, useLayoutEffect, useState } from 'react'
import { Router, RouterProps } from 'react-router-dom'

export type TCustomRouter = Omit<
	RouterProps,
	'location' | 'navigationType' | 'navigator'
>

export interface ICustomRouter extends TCustomRouter {
	history: BrowserHistory
}

export const CustomRouter: FC<ICustomRouter> = ({ history, ...props }) => {
	const [state, setState] = useState({
		action: history.action,
		location: history.location,
	})

	useLayoutEffect(() => history.listen(setState), [history])

	return (
		<Router
			{...props}
			location={state.location}
			navigationType={state.action}
			navigator={history}
		/>
	)
}
