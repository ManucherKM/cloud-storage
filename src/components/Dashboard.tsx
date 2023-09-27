import { FC, ReactNode } from 'react'
import { IMenu, Menu } from './Menu'

export interface IDashboard extends IMenu {
	children: ReactNode
}

export const Dashboard: FC<IDashboard> = ({ title, children }) => {
	return (
		<div className="w-full h-full p-5">
			<div className="w-full h-full bg-[--kuui-black-500] rounded-xl flex overflow-hidden">
				<div className="w-full min-w-[150px] max-w-[200px] border-solid border-0 border-r border-[--kuui-black-250]">
					<Menu title={title} />
				</div>

				{children}
			</div>
		</div>
	)
}
