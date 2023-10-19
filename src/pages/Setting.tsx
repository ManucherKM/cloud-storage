import { SettingContent, SlidingFromLeftToRight } from '@/components'
import { FC } from 'react'

export const Setting: FC = () => {
	return (
		<SlidingFromLeftToRight className="h-full">
			<SettingContent />
		</SlidingFromLeftToRight>
	)
}
