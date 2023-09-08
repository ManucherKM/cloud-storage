import { Home, Login, Registration, Storage } from '@/pages'

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
