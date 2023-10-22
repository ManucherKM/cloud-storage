// Types
import type { IButton } from 'kuui-react'
import type { FC } from 'react'

// Components
import { Button } from 'kuui-react'

/** Acceptable types for `LayoutNavigateButton`. */
export type TLayoutNavigateButton = Omit<IButton, 'variant' | 'className'>

/** `LayoutNavigateButton` component interface. */
export interface ILayoutNavigateButton extends TLayoutNavigateButton {}

/**
 * Navigation Button Layout.
 *
 * @example
 * 	;<LayoutNavigateButton>
 * 		<Restore />
 * 		Restore
 * 	</LayoutNavigateButton>
 *
 * @param props Propses
 */
export const LayoutNavigateButton: FC<ILayoutNavigateButton> = ({
	children,
	...props
}) => {
	return (
		<Button variant="navigate" className="text-black-250" {...props}>
			<div className="flex items-center gap-1">{children}</div>
		</Button>
	)
}
