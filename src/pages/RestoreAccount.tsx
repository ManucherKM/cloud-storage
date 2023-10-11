import { FormEmail, FormOTP, FormPassword } from '@/components'
import { FC } from 'react'

export const RestoreAccount: FC = () => {
	return (
		<div className="w-full h-full flex justify-center items-center">
			{/* <FormOTP email="test@gmail.com" /> */}
			<FormEmail />
			{/* <FormPassword /> */}
		</div>
	)
}
