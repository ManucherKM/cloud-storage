// Types
import type { FC } from 'react'

// Components
import { SettingContent, SlidingFromLeftToRight } from '@/components'

/**
 * Setting page.
 * @example <Setting />
 */
export const Setting: FC = () => {
	return (
		<SlidingFromLeftToRight className="h-full">
			<SettingContent />
		</SlidingFromLeftToRight>
	)
}
