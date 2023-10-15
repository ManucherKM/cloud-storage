import { Paragraph } from 'kuui-react'
import { FC, HTMLAttributes } from 'react'

export type TLayoutSettingParameter = HTMLAttributes<HTMLDivElement>

export interface ILayoutSettingParameter extends TLayoutSettingParameter {
	settingName: string
}

export const LayoutSettingParameter: FC<ILayoutSettingParameter> = ({
	settingName,
	children,
	...props
}) => {
	return (
		<div {...props}>
			<Paragraph className="mb-4">{settingName}</Paragraph>
			{children}
		</div>
	)
}
