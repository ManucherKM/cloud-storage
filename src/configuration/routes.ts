import { Home, Login, Registration, Setting, Storage, Trash } from '@/pages'
import { Download } from '@/pages/Download'
import { FC } from 'react'

/** Application Routing Interface. */
export interface IRoute {
	path: string
	component: FC
}

/** Enumeration of possible application routes. */
export enum ERoutes {
	home = '/',
	login = '/login',
	registration = '/registration',
	storage = '/storage',
	trash = '/trash',
	setting = '/setting',
	download = '/download',
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
	{
		path: ERoutes.download + '/:id',
		component: Download,
	},
]

/** Private Routes */
export const privateRoutes: IRoute[] = [
	{
		path: ERoutes.storage,
		component: Storage,
	},
	{
		path: ERoutes.trash,
		component: Trash,
	},
	{
		path: ERoutes.setting,
		component: Setting,
	},
]
