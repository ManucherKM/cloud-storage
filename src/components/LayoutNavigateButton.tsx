import { Button } from 'kuui-react'
import { IButton } from 'kuui-react/dist/ui/Button/Button'
import { FC } from 'react'

export type TLayoutNavigateButton = Omit<IButton, 'variant' | 'className'>

export interface ILayoutNavigateButton extends TLayoutNavigateButton {}

export const LayoutNavigateButton: FC<ILayoutNavigateButton> = ({
	children,
	...props
}) => {
	return (
		<Button variant="navigate" className="text-[--kuui-black-250]" {...props}>
			<div className="flex items-center gap-1">{children}</div>
		</Button>
	)
}
