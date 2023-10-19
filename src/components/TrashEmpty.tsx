import { Remove as TrashSVG } from '@/assets/icons'
import clsx from 'clsx'
import { Paragraph } from 'kuui-react'
import { FC, HTMLAttributes } from 'react'

export interface ITrashEmpty extends HTMLAttributes<HTMLDivElement> {}

export const TrashEmpty: FC<ITrashEmpty> = ({ className, ...props }) => {
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
