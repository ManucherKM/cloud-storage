import * as icons from '@/assets/icons'
import { ERoutes } from '@/configuration/routes'
import { useAuthStore, useStore } from '@/storage'
import { ListItem, Title } from 'kuui-react'
import { FC } from 'react'
import { useNavigate } from 'react-router'

export interface IMenu {
	title: string
}

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
			<ListItem
				to={ERoutes.storage}
				align="left"
				title="Storage"
				icon={<icons.Storage />}
			/>
			<ListItem
				to={ERoutes.trash}
				align="left"
				title="Trash"
				icon={<icons.Trash />}
			/>
			<ListItem
				to={ERoutes.setting}
				align="left"
				title="Setting"
				icon={<icons.Gear />}
			/>
			<ListItem
				to={'#'}
				align="left"
				title="Logout"
				onClick={logoutHandler}
				icon={<icons.Logout />}
			/>
		</>
	)
}
