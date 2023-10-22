// Types
import { Remove as TrashSVG } from '@/assets/icons'
import { FC, HTMLAttributes } from 'react'

// Utils
import clsx from 'clsx'

// Components
import { Paragraph } from 'kuui-react'

/** `TrashEmpty` component interface. */
export interface ITrashEmpty extends HTMLAttributes<HTMLDivElement> {}

/**
 * Component for cases when user's trash garbage can is empty.
 *
 * @example
 * 	;<TrashEmpty />
 *
 * @param props Propses
 */
export const TrashEmpty: FC<ITrashEmpty> = ({ className, ...props }) => {
	/** Root block styles */
	const styles = clsx([
		'flex flex-col justify-center items-center gap-3',
		className,
	])
	return (
		<div className={styles} {...props}>
			<TrashSVG width="100" height="100" color="var(--kuui-black-250)" />
			<Paragraph variant="passive">The trash is empty</Paragraph>
		</div>
	)
}
