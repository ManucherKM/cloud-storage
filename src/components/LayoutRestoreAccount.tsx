// Types
import type { FC, HTMLAttributes } from 'react'

// Utils
import clsx from 'clsx'

/** `LayoutRestoreAccount` component interface. */
export interface ILayoutRestoreAccount extends HTMLAttributes<HTMLDivElement> {}

/**
 * @example
 * 	;<LayoutRestoreAccount> ...other code</LayoutRestoreAccount>
 *
 * @param props Propses
 */
export const LayoutRestoreAccount: FC<ILayoutRestoreAccount> = ({
	children,
	className,
	...props
}) => {
	/** Root block styles. */
	const styles = clsx([
		'w-full h-full flex justify-center items-center',
		className,
	])
	return (
		<div className={styles} {...props}>
			{children}
		</div>
	)
}
