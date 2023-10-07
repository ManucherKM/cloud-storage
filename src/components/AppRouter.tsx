import { privateRoutes, publicRoutes } from '@/configuration/routes'
import { useAuthStore } from '@/storage'
import { NotFound } from 'kuui-react'
import { FC } from 'react'
import { Route, Routes } from 'react-router'

/** The component responsible for drawing routes. */
export const AppRouter: FC = () => {
	const isAuth: boolean = !!useAuthStore(store => store.token)

	return (
		<Routes>
			{publicRoutes.map(route => (
				<Route
					key={route.path}
					path={route.path}
					element={<route.component />}
				/>
			))}
			{isAuth && (
				<>
					{privateRoutes.map(route => (
						<Route
							key={route.path}
							path={route.path}
							element={<route.component />}
						/>
					))}
				</>
			)}
			<Route path="/*" element={<NotFound />} />
		</Routes>
	)
}
