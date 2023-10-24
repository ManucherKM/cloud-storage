// Types
import type { IListItem } from 'kuui-react'
import type { FC, HTMLAttributes } from 'react'

// Utils
import { ERoutes } from '@/configuration/routes'
import { useLoader, useRouteContain } from '@/hooks'
import { useAuthStore } from '@/storage'
import { useNavigate } from 'react-router'

// Icons
import { Gear, Logout, Storage, Trash } from '@/assets/icons'

// Components
import clsx from 'clsx'
import { ListItem, Title } from 'kuui-react'
import { List } from './List'

/** `Menu` component interface */
export interface IMenu extends HTMLAttributes<HTMLDivElement> {
	/** Menu title (e.g. the name of the current page). */
	title: string
}

/** Navigation button interface. */
export interface INavigationButtons extends IListItem {}

/**
 * A user panel for navigating the web application.
 *
 * @example
 * 	;<Menu title={'Setting'} />
 *
 * @param props Propses
 */
export const Menu: FC<IMenu> = ({ title, className, ...props }) => {
	/** Function to log the user out of the account. */
	const logout = useAuthStore(store => store.logout)

	// A function for showing Loader to the user when requesting an API.
	const loader = useLoader()

	/** Function to redirect the user. */
	const navigate = useNavigate()

	/** Handler function that will be called when clicking on the exit button. */
	async function logoutHandler() {
		/**
		 * Enter the result of the `logout` function execution into the `isSuccess`
		 * variable.
		 */
		const isSuccess = await loader(logout)

		// If you are unable to log out of the account.
		if (!isSuccess) {
			// Terminate the function.
			return
		}

		// Redirect the user to the home page.
		navigate(ERoutes.home)
	}

	/** Array of navigation buttons. */
	const navigationButtons: INavigationButtons[] = [
		{
			isActive: useRouteContain(ERoutes.storage),
			to: ERoutes.storage,
			align: 'left',
			title: 'Storage',
			icon: <Storage />,
		},
		{
			isActive: useRouteContain(ERoutes.trash),
			to: ERoutes.trash,
			align: 'left',
			title: 'Trash',
			icon: <Trash />,
		},
		{
			isActive: useRouteContain(ERoutes.setting),
			to: ERoutes.setting,
			align: 'left',
			title: 'Setting',
			icon: <Gear />,
		},
	]

	/** Root block styles. */
	const styles = clsx('w-full min-w-[150px] max-w-[200px]', className)
	return (
		<div className={styles} {...props}>
			<Title className="px-4 py-2">{title}</Title>
			<List
				arr={navigationButtons}
				callback={(button, idx) => <ListItem key={idx} {...button} />}
			/>
			<ListItem
				to="#"
				align="left"
				title="Logout"
				onClick={logoutHandler}
				icon={<Logout />}
			/>
		</div>
	)
}
