// Types
import type { FC, HTMLAttributes } from 'react'

// Components
import { Paragraph } from 'kuui-react'

/** Allowed types for `LayoutSettingParameter`. */
export type TLayoutSettingParameter = HTMLAttributes<HTMLDivElement>

/** `LayoutSettingParameter` component interface. */
export interface ILayoutSettingParameter extends TLayoutSettingParameter {
	/** Name of setting. */
	settingName: string
}

/**
 * Settings Panel Layout.
 *
 * @example
 * 	;<LayoutSettingParameter settingName="Theme">
 * 		...other code
 * 	</LayoutSettingParameter>
 *
 * @param props Propses
 */
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
