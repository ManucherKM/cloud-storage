//  Types
import type { FC } from 'react'
import type { ILayoutNavigateButton } from './LayoutNavigateButton'

// Components
import { LayoutNavigateButton } from './LayoutNavigateButton'

// Icons
import { Remove } from '@/assets/icons'

/** Valid types for `NavigateButtonRemove`. */
export type TNavigateButtonRemove = Omit<ILayoutNavigateButton, 'children'>

/** `NavigateButtonRemove` component interface. */
export interface INavigateButtonRemove extends TNavigateButtonRemove {}

/**
 * NavigateButtonRemove represents a button for the user's "Remove" action.
 *
 * @param props Propses
 */
export const NavigateButtonRemove: FC<INavigateButtonRemove> = props => {
	return (
		<LayoutNavigateButton {...props}>
			<Remove width="16" height="16" />
			Remove
		</LayoutNavigateButton>
	)
}
