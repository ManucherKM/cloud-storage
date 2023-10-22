//  Types
import type { FC } from 'react'
import type { ILayoutNavigateButton } from './LayoutNavigateButton'

// Components
import { LayoutNavigateButton } from './LayoutNavigateButton'

// Icons
import { Restore } from '@/assets/icons'

/** Valid types for `NavigateButtonRestore`. */
export type TNavigateButtonRestore = Omit<ILayoutNavigateButton, 'children'>

/** `NavigateButtonRestore` component interface. */
export interface INavigateButtonRestore extends TNavigateButtonRestore {}

/**
 * NavigateButtonRestore represents a button for the user's "Restore" action.
 *
 * @param props Propses
 */
export const NavigateButtonRestore: FC<INavigateButtonRestore> = props => {
	return (
		<LayoutNavigateButton {...props}>
			<Restore />
			Restore
		</LayoutNavigateButton>
	)
}
