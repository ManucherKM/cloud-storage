import {
	AlertError,
	AlertMessage,
	Dashboard,
	LayoutSettingParameter,
} from '@/components'
import { useStore } from '@/storage'
import { useConfigStore } from '@/storage/useConfigStore/useConfigStore'
import { Button, ChangeRound, ColorThemes, Form } from 'kuui-react'
import { ITheme } from 'kuui-react/dist/components/ColorThemes/ColorThemes'
import { FC, FormEvent, useEffect, useState } from 'react'

export interface ISettingDefaultForm {
	round: string
	themeId: string
}

const defaultForm: ISettingDefaultForm = {
	round: '',
	themeId: '',
}

export const SettingContent: FC = () => {
	const themes = useConfigStore(store => store.themes)
	const getThemes = useConfigStore(store => store.getThemes)
	const createConfig = useConfigStore(store => store.createConfig)
	const [isValid, setIsValid] = useState<boolean>(false)
	const updateConfig = useConfigStore(store => store.updateConfig)
	const config = useConfigStore(store => store.config)
	const setLoading = useStore(store => store.setLoading)
	const [form, setForm] = useState<ISettingDefaultForm>({
		round: config?.round || defaultForm.round,
		themeId: config?.theme.id || defaultForm.themeId,
	})

	const [error, setError] = useState<string>('')
	const [message, setMessage] = useState<string>('')

	function errorTimeHandler() {
		setError('')
	}

	function messageTimeHandler() {
		setMessage('')
	}

	async function sendToApi() {
		if (!form.round && !form.themeId) {
			return
		}

		setLoading(true)

		const isConfigCreated = await createConfig(form.round, form.themeId)

		if (isConfigCreated) {
			setLoading(false)
			setMessage('The data was successfully saved.')
			setForm(defaultForm)
			return
		}

		const isConfigUpdated = await updateConfig(form.round, form.themeId)

		if (isConfigUpdated) {
			setLoading(false)
			setMessage('The data was successfully saved.')
			setForm(defaultForm)
			return
		}

		setError('Failed to save data.')

		setLoading(false)
	}

	async function submitHandler(e: FormEvent<HTMLFormElement>) {
		e.preventDefault()
		await sendToApi()
	}

	function themeChangeHandler(theme: ITheme) {
		setForm(prev => ({ ...prev, themeId: theme.id }))
	}

	function roundChangeHandler(round: string) {
		setForm(prev => ({ ...prev, round: round }))
	}

	useEffect(() => {
		const fetchData = async () => {
			try {
				setLoading(true)
				await getThemes()
				setLoading(false)
			} catch (e) {
				console.error(e)
				setError('Failed to get list of topics.')
			}
		}

		fetchData()
	}, [])

	useEffect(() => {
		const isValid = !!form.themeId || !!form.round

		setIsValid(isValid)
	}, [form])
	return (
		<>
			<AlertMessage message={message} onTimeUp={messageTimeHandler} />
			<AlertError error={error} onTimeUp={errorTimeHandler} />
			<Dashboard title="Setting">
				<div className="p-5">
					<Form className="flex flex-col gap-4" onSubmit={submitHandler}>
						<LayoutSettingParameter settingName="Theme">
							<ColorThemes themes={themes} onChangeTheme={themeChangeHandler} />
						</LayoutSettingParameter>
						<LayoutSettingParameter settingName="Round">
							<ChangeRound onChangeRound={roundChangeHandler} />
						</LayoutSettingParameter>
						<div>
							<Button variant="active" type="submit" disabled={!isValid}>
								Save changes
							</Button>
						</div>
					</Form>
				</div>
			</Dashboard>
		</>
	)
}
