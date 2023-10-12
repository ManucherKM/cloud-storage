import clsx from 'clsx'
import { FC, HTMLAttributes } from 'react'

export interface ILayoutRestoreAccount extends HTMLAttributes<HTMLDivElement> {}

export const LayoutRestoreAccount: FC<ILayoutRestoreAccount> = ({
	children,
	className,
	...props
}) => {
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
