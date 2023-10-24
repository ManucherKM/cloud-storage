// Types
import type { IColorTheme } from 'kuui-react'
import type { FC, FormEvent } from 'react'

// Utils
import { useConfigStore, useStore } from '@/storage'
import { useEffect, useState } from 'react'

// Components
import { Button, ChangeRound, ColorThemes, Form } from 'kuui-react'
import { AlertError } from './AlertError'
import { AlertMessage } from './AlertMessage'
import { LayoutDashboard } from './LayoutDashboard'
import { LayoutSettingParameter } from './LayoutSettingParameter'

/** Interface of the default configuration settings form values. */
export interface ISettingDefaultForm {
	/** Rounding the corners of elements. */
	round: string

	/** The identifier of the color theme. */
	themeId: string
}

/** Default configuration settings form. */
const defaultForm: ISettingDefaultForm = {
	round: '',
	themeId: '',
}

/**
 * The content of the Setting page.
 *
 * @example
 * 	;<SettingContent />
 */
export const SettingContent: FC = () => {
	/** An array of possible color themes. */
	const themes = useConfigStore(store => store.themes)

	/** A function to retrieve possible topics from the API. */
	const getThemes = useConfigStore(store => store.getThemes)

	/** Function for creating a user's config on the server. */
	const createConfig = useConfigStore(store => store.createConfig)

	/** State for themeId validity. */
	const [isValid, setIsValid] = useState<boolean>(false)

	/** State for themeId validity. */
	const [isThemeIdValid, setIsThemeIdValid] = useState<boolean>(false)

	/** State for round validity. */
	const [isRoundValid, setIsRoundValid] = useState<boolean>(false)

	/** Function to update the user's config on the API. */
	const updateConfig = useConfigStore(store => store.updateConfig)

	/** Current user configuration. */
	const config = useConfigStore(store => store.config)

	/** Function for changing the state of the Loader. */
	const setLoading = useStore(store => store.setLoading)

	/** The state for a form with customizations. */
	const [form, setForm] = useState<ISettingDefaultForm>({
		round: config?.round || defaultForm.round,
		themeId: config?.theme.id || defaultForm.themeId,
	})

	/** State for errors that need to be shown to the user. */
	const [error, setError] = useState<string>('')

	/** State for messages that need to be shown to the user. */
	const [message, setMessage] = useState<string>('')

	/**
	 * Handler function that will be executed when the time of error displaying
	 * expires.
	 */
	function errorTimeHandler() {
		// Clearing the state with the error.
		setError('')
	}

	/**
	 * Handler function that will be executed when the time of message displaying
	 * expires.
	 */
	function messageTimeHandler() {
		// Clearing the state with the message.
		setMessage('')
	}

	/** Function to send a request to the API. */
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

	/**
	 * Handler function that will be processed when the form is sent through the
	 * button.
	 *
	 * @param e Form event
	 */
	async function submitHandler(e: FormEvent<HTMLFormElement>) {
		// Prevent the default behavior of the browser.
		e.preventDefault()

		// Send the request to the server.
		await sendToApi()
	}

	/**
	 * Handler function that will be executed when the color theme is changed.
	 *
	 * @param theme Chosen color theme.
	 */
	function themeChangeHandler(theme: IColorTheme) {
		// Putting the color theme id in the form.
		setForm(prev => ({ ...prev, themeId: theme.id }))
	}

	/**
	 * Handler function that will be executed when the color round is changed.
	 *
	 * @param round Specified rounding of corners of elements.
	 */
	function roundChangeHandler(round: string) {
		// Add the specified value to the form.
		setForm(prev => ({ ...prev, round: round }))
	}

	// Each time the rounding of elements specified by the user is changed, we call the callback.
	useEffect(() => {
		// The meaning of validity.
		const isValid = !!form.round.length

		// Changing the validity state.
		setIsRoundValid(isValid)
	}, [form.round])

	// Every time the ID of the theme selected by the user changes, we call the callback.
	useEffect(() => {
		// The meaning of validity.
		const isValid = !!form.themeId.length

		// Changing the validity state.
		setIsThemeIdValid(isValid)
	}, [form.themeId])

	// Every time we change the form validity we call the callback.
	useEffect(() => {
		// The meaning of validity.
		const isValid = isRoundValid || isThemeIdValid

		// Changing the validity state.
		setIsValid(isValid)
	}, [isRoundValid, isThemeIdValid])

	// Call callback on the first render.
	useEffect(() => {
		const fetchThemes = async () => {
			try {
				setLoading(true)
				await getThemes()
			} catch (e) {
				console.error(e)
				setError('Failed to get list of color themes.')
			} finally {
				setLoading(false)
			}
		}

		fetchThemes()
	}, [getThemes, setLoading])
	return (
		<>
			<AlertMessage message={message} onTimeUp={messageTimeHandler} />
			<AlertError error={error} onTimeUp={errorTimeHandler} />
			<LayoutDashboard title="Setting">
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
			</LayoutDashboard>
		</>
	)
}
