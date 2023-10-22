// Types
import type { FC, ReactNode } from 'react'
import type { IMenu } from './Menu'

// Components
import { Menu } from './Menu'

/** `LayoutDashboard` component interface. */
export interface ILayoutDashboard extends IMenu {
	/** Subsidiary elements. */
	children: ReactNode
}

/**
 * Use this layout to Expand the user's dashboard.
 *
 * @example
 * 	;<LayoutDashboard title="Title">...other code</LayoutDashboard>
 *
 * @param props Propses
 */
export const LayoutDashboard: FC<ILayoutDashboard> = ({ title, children }) => {
	return (
		<div className="w-full h-full p-5">
			<div className="w-full h-full bg-black-500 rounded-xl flex overflow-hidden">
				<Menu
					title={title}
					className="border-solid border-0 border-r border-black-250"
				/>

				<div className="w-full h-full">{children}</div>
			</div>
		</div>
	)
}
