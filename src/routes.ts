import { Home, Login, Registration, Storage } from '@/pages'

export interface IRoute {
	path: string
	component: () => JSX.Element
}

export enum ERoutes {
	home = '/',
	login = '/login',
	registration = '/registration',
	storage = '/storage',
}

export const publicRoutes: IRoute[] = [
	{
		path: ERoutes.home,
		component: Home,
	},
	{
		path: ERoutes.login,
		component: Login,
	},
	{
		path: ERoutes.registration,
		component: Registration,
	},
]

export const privateRoutes: IRoute[] = [
	{
		path: ERoutes.storage,
		component: Storage,
	},
]
