import { Home } from './pages/Home'
import { Login } from './pages/Login'
import { Registration } from './pages/Registration'
import { Storage } from './pages/Storage'

export interface IRoute {
	path: string
	component: () => JSX.Element
}

export const publicRoutes: IRoute[] = [
	{
		path: '/',
		component: Home,
	},
	{
		path: '/login',
		component: Login,
	},
	{
		path: '/registration',
		component: Registration,
	},
]

export const privateRoutes: IRoute[] = [
	{
		path: '/storage',
		component: Storage,
	},
]
