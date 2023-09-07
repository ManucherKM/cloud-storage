import { Routes, Route } from 'react-router'
import { privateRoutes, publicRoutes } from '../routes'
import { NotFound } from 'kuui-react'

export const AppRouter = () => {
	const isAuth: boolean = false

	return (
		<Routes>
			{isAuth
				? privateRoutes.map(route => (
						<Route
							key={route.path}
							path={route.path}
							Component={route.component}
						/>
				  ))
				: publicRoutes.map(route => (
						<Route
							key={route.path}
							path={route.path}
							Component={route.component}
						/>
				  ))}
			<Route path="/*" Component={NotFound} />
		</Routes>
	)
}
