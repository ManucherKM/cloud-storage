import { privateRoutes, publicRoutes } from '@/configuration/routes'
import { useAuthStore, useStore } from '@/storage'
import { Loader, NotFound } from 'kuui-react'
import { Route, Routes } from 'react-router'
import { FC } from 'react'

/** The component responsible for drawing routes. */
export const AppRouter: FC = () => {
	const isLoading = useStore(store => store.isLoading)
	const isAuth: boolean = !!useAuthStore(store => store.token)

	return (
		<>
			{isLoading && <Loader />}
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
		</>
	)
}
