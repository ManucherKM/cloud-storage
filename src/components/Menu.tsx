import * as icons from '@/assets/icons'
import { ERoutes } from '@/configuration/routes'
import { useWindowHrefContain } from '@/hooks'
import { useAuthStore, useStore } from '@/storage'
import { ListItem, Title } from 'kuui-react'
import { IListItem } from 'kuui-react/dist/components/ListItem/ListItem'
import { FC } from 'react'
import { useNavigate } from 'react-router'
import { List } from '.'

export interface IMenu {
	title: string
}

export interface INavigationButtons extends IListItem {}

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

	const navigationButtons: INavigationButtons[] = [
		{
			isActive: useWindowHrefContain(ERoutes.storage),
			to: ERoutes.storage,
			align: 'left',
			title: 'Storage',
			icon: <icons.Storage />,
		},
		{
			isActive: useWindowHrefContain(ERoutes.trash),
			to: ERoutes.trash,
			align: 'left',
			title: 'Trash',
			icon: <icons.Trash />,
		},
		{
			isActive: useWindowHrefContain(ERoutes.setting),
			to: ERoutes.setting,
			align: 'left',
			title: 'Setting',
			icon: <icons.Gear />,
		},
	]

	return (
		<>
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
				icon={<icons.Logout />}
			/>
		</>
	)
}
