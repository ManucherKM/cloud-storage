// Types
import type { FC } from 'react'

// Components
import {
	AccountConfirm,
	Download,
	Home,
	Login,
	Registration,
	RestoreAccountEmail,
	RestoreAccountOTP,
	RestoreAccountPassword,
	Setting,
	Storage,
	Trash,
} from '@/pages'

/** Application Routing Interface. */
export interface IRoute {
	path: string
	component: FC
}

/** Enumeration of possible application routes. */
export enum ERoutes {
	home = '/',
	login = '/auth/login',
	registration = '/auth/registration',
	restoreAccountEmail = '/auth/restore/email',
	restoreAccountOTP = '/auth/restore/otp',
	restoreAccountPassword = '/auth/restore/password',
	storage = '/storage',
	trash = '/trash',
	setting = '/setting',
	download = '/download',
	accountConfirm = '/accountConfirm',
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
		path: ERoutes.restoreAccountEmail,
		component: RestoreAccountEmail,
	},

	{
		path: ERoutes.restoreAccountOTP,
		component: RestoreAccountOTP,
	},
	{
		path: ERoutes.download + '/:id',
		component: Download,
	},
	{
		path: ERoutes.accountConfirm,
		component: AccountConfirm,
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
	{
		path: ERoutes.restoreAccountPassword,
		component: RestoreAccountPassword,
	},
]
