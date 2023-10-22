// Types
import type { HTMLMotionProps } from 'framer-motion'
import type { FC } from 'react'

// Components
import { AnimatePresence, motion } from 'framer-motion'

/** Allowable types of `SlidingFromLeftToRight`. */
export interface ISlidingFromLeftToRight extends HTMLMotionProps<'div'> {}

/**
 * A component for left-to-right sliding animation.
 *
 * @example
 * 	;<SlidingFromLeftToRight>
 * 		<h1>Hello world</h1>
 * 	</SlidingFromLeftToRight>
 *
 * @param props Propses
 */
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
