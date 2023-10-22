//  Types
import type { FC } from 'react'
import type { ILayoutNavigateButton } from './LayoutNavigateButton'

// Components
import { LayoutNavigateButton } from './LayoutNavigateButton'

// Icons
import { Share } from '@/assets/icons'

/** Valid types for `NavigateButtonShare`. */
export type TNavigateButtonShare = Omit<ILayoutNavigateButton, 'children'>

/** `NavigateButtonShare` component interface. */
export interface INavigateButtonShare extends TNavigateButtonShare {}

/**
 * NavigateButtonShare represents a button for the user's "share" action.
 *
 * @param props Propses
 */
export const NavigateButtonShare: FC<INavigateButtonShare> = props => {
	return (
		<LayoutNavigateButton {...props}>
			<Share />
			Share
		</LayoutNavigateButton>
	)
}
