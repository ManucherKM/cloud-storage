import { AnimatePresence, HTMLMotionProps, motion } from 'framer-motion'
import { FC } from 'react'

export interface ISlidingFromLeftToRight extends HTMLMotionProps<'div'> {}

export const SlidingFromLeftToRight: FC<ISlidingFromLeftToRight> = props => {
	return (
		<AnimatePresence>
			<motion.div
				initial={{ opacity: 0, x: '-100px' }}
				animate={{ opacity: 1, x: '0' }}
				exit={{ opacity: 0, x: '-100px' }}
				transition={{ duration: '0.2' }}
				{...props}
			/>
		</AnimatePresence>
	)
}
