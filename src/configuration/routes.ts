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
	/** The path along which the component will be rendered. */
	path: string

	/** The component that will be rendered. */
	component: FC
}

/** Enumeration of possible application routes. */
export enum ERoutes {
	/** `Home` page route. */
	home = '/',

	/** `Login` page route. */
	login = '/auth/login',

	/** `Registration` page route. */
	registration = '/auth/registration',

	/** `RestoreAccountEmail` page route. */
	restoreAccountEmail = '/auth/restore/email',

	/** `RestoreAccountOTP` page route. */
	restoreAccountOTP = '/auth/restore/otp',

	/** `RestoreAccountPassword` page route. */
	restoreAccountPassword = '/auth/restore/password',

	/** `Storage` page route. */
	storage = '/storage',

	/** `Trash` page route. */
	trash = '/trash',

	/** `Setting` page route. */
	setting = '/setting',

	/** `Download` page route. */
	download = '/download',

	/** `AccountConfirm` page route. */
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
