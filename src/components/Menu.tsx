import { ERoutes } from '@/configuration/routes'
import { useAuthStore, useFileStore, useStore } from '@/storage'
import { Alert, ListItem, Title } from 'kuui-react'
import { FC, useState } from 'react'
import { useNavigate } from 'react-router'
import * as icons from '@/assets/icons'

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
				svgIcon={<icons.Storage />}
			/>
			<ListItem
				to={ERoutes.trash}
				align="left"
				title="Trash"
				svgIcon={<icons.Trash />}
			/>
			<ListItem
				to={ERoutes.setting}
				align="left"
				title="Setting"
				svgIcon={<icons.Gear />}
			/>
			<ListItem
				to={'#'}
				align="left"
				title="Logout"
				onClick={logoutHandler}
				svgIcon={<icons.Logout />}
			/>
		</>
	)
}
