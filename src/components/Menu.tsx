import * as icons from '@/assets/icons'
import { ERoutes } from '@/configuration/routes'
import { useAuthStore, useStore } from '@/storage'
import { isWindowHrefContain } from '@/utils'
import { ListItem, Title } from 'kuui-react'
import { IListItem } from 'kuui-react/dist/components/ListItem/ListItem'
import { FC } from 'react'
import { useNavigate } from 'react-router'
import { List } from '.'

export interface IMenu {
	title: string
}

export interface INavigationButtons extends IListItem {}

export const navigationButtons: INavigationButtons[] = [
	{
		isActive: isWindowHrefContain(ERoutes.storage),
		to: ERoutes.storage,
		align: 'left',
		title: 'Storage',
		icon: <icons.Storage />,
	},
	{
		isActive: isWindowHrefContain(ERoutes.trash),
		to: ERoutes.trash,
		align: 'left',
		title: 'Trash',
		icon: <icons.Trash />,
	},
	{
		isActive: isWindowHrefContain(ERoutes.setting),
		to: ERoutes.setting,
		align: 'left',
		title: 'Setting',
		icon: <icons.Gear />,
	},
]

export const Menu: FC<IMenu> = ({ title }) => {
	const logout = useAuthStore(store => store.logout)
	const setLoading = useStore(store => store.setLoading)
	const navigate = useNavigate()

	async function logoutHandler() {
		setLoading(true)
		const isSuccess = await logout()

		if (!isSuccess) {
			setLoading(false)
			return
		}

		navigate(ERoutes.home)
		setLoading(false)
	}

	return (
		<>
			<Title className="px-4 py-2">{title}</Title>
			<List
				arr={navigationButtons}
				callback={(button, idx) => (
					<ListItem
						key={idx}
						to={button.to}
						align={button.align}
						title={button.title}
						onClick={button.onClick}
						icon={button.icon}
					/>
				)}
			/>
			<ListItem
				to="#"
				align="left"
				title="Logout"
				onClick={logoutHandler}
				icon={<icons.Logout />}
			/>
		</>
	)
}
