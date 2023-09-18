import { Home, Login, Registration, Storage } from '@/pages'

/** Application Routing Interface. */
export interface IRoute {
	path: string
	component: () => JSX.Element
}

/** Enumeration of possible application routes. */
export enum ERoutes {
	home = '/',
	login = '/login',
	registration = '/registration',
	storage = '/storage',
}

/** Public Routes */
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

/** Private Routes */
export const privateRoutes: IRoute[] = [
	{
		path: ERoutes.storage,
		component: Storage,
	},
]
