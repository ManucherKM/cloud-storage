import { AnimatePresence, motion } from 'framer-motion'
import { ReactNode } from 'react'

export interface ISlidingFromLeftToRight {
	children: ReactNode
}

export function SlidingFromLeftToRight({ children }: ISlidingFromLeftToRight) {
	return (
		<AnimatePresence>
			<motion.div
				initial={{ opacity: 0, x: '-100px' }}
				animate={{ opacity: 1, x: '0' }}
				exit={{ opacity: 0, x: '-100px' }}
				transition={{ duration: '0.2' }}
			>
				{children}
			</motion.div>
		</AnimatePresence>
	)
}
