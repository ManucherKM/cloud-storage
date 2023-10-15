import { AlertError, Dashboard, LayoutSettingParameter } from '@/components'
import { Button, ChangeRound, ColorThemes, Form } from 'kuui-react'
import { FC, FormEvent, useState } from 'react'

export const Setting: FC = () => {
	const [error, setError] = useState<string>('')

	function errorTimeHandler() {
		setError('')
	}

	async function sendToApi() {
		console.log('Saved')
	}

	async function submitHandler(e: FormEvent<HTMLFormElement>) {
		e.preventDefault()
		await sendToApi
	}

	return (
		<>
			<AlertError error={error} onTimeUp={errorTimeHandler} />
			<Dashboard title="Setting">
				<div className="p-5">
					<Form className="flex flex-col gap-4" onSubmit={e => submitHandler}>
						<LayoutSettingParameter settingName="Theme">
							<ColorThemes />
						</LayoutSettingParameter>
						<LayoutSettingParameter settingName="Round">
							<ChangeRound />
						</LayoutSettingParameter>
						<div>
							<Button variant="active" type="submit">
								Save changes
							</Button>
						</div>
					</Form>
				</div>
			</Dashboard>
		</>
	)
}
