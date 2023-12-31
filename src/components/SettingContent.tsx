// Types
import type { IColorTheme } from 'kuui-react'
import type { FC, FormEvent } from 'react'

// Utils
import { useConfigStore, useNotificationsStore } from '@/storage'
import { useEffect, useState } from 'react'

// Components
import { useLoader } from '@/hooks'
import { Button, ChangeRound, ColorThemes, Form } from 'kuui-react'
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
	// An array of possible color themes.
	const themes = useConfigStore(store => store.themes)

	// A function to retrieve possible topics from the API.
	const getThemes = useConfigStore(store => store.getThemes)

	// Function for creating a user's config on the server.
	const createConfig = useConfigStore(store => store.createConfig)

	// State for themeId validity.
	const [isValid, setIsValid] = useState<boolean>(false)

	// State for themeId validity.
	const [isThemeIdValid, setIsThemeIdValid] = useState<boolean>(false)

	// State for round validity.
	const [isRoundValid, setIsRoundValid] = useState<boolean>(false)

	// Function to update the user's config on the API.
	const updateConfig = useConfigStore(store => store.updateConfig)

	// Current user configuration.
	const config = useConfigStore(store => store.config)

	// A function for showing Loader to the user when requesting an API.
	const loader = useLoader()

	// The state for a form with customizations.
	const [form, setForm] = useState<ISettingDefaultForm>({
		round: config?.round || defaultForm.round,
		themeId: config?.theme.id || defaultForm.themeId,
	})

	// Function to create a new error to show it to the user.
	const newError = useNotificationsStore(store => store.newError)

	// Function to create a new message to show it to the user.
	const newMessage = useNotificationsStore(store => store.newMessage)

	// Function to send a request to the API.
	async function sendToApi() {
		// If the email is not valid, terminate the function.
		if (!isValid) return

		// We get the result of the request to create a config (if the user changes it for the first time).
		const isConfigCreated = await loader(createConfig, form.round, form.themeId)

		// If the config has been created.
		if (isConfigCreated) {
			// Show the user a message.
			newMessage('The data was successfully saved.')

			// Clearing the form.
			setForm(defaultForm)

			// Preventing further execution of the function.
			return
		}

		// We get the result of the request to update the config.
		const isConfigUpdated = await updateConfig(form.round, form.themeId)

		// If the config has been updated.
		if (isConfigUpdated) {
			// Show the user a message.
			newMessage('The data was successfully saved.')

			// Clearing the form.
			setForm(defaultForm)

			// Preventing further execution of the function.
			return
		}

		// if it was not possible to update the config, we show the user an error message.
		newError('Failed to save data.')
	}

	// Handler function that will be processed when the form is sent through the button.
	async function submitHandler(e: FormEvent<HTMLFormElement>) {
		// Prevent the default behavior of the browser.
		e.preventDefault()

		// Send the request to the server.
		await sendToApi()
	}

	// Handler function that will be executed when the color theme is changed.
	function themeChangeHandler(theme: IColorTheme) {
		// Putting the color theme id in the form.
		setForm(prev => ({ ...prev, themeId: theme.id }))
	}

	// Handler function that will be executed when the color round is changed.
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
		// function for retrieving available topics from the API.
		const fetchThemes = async () => {
			// We get the result of the request.
			const isSuccess = await loader(getThemes)

			// If the request was unsuccessful.
			if (!isSuccess) {
				// Show the user an error message.
				newError('Failed to get list of color themes.')
			}
		}

		// Send a request.
		fetchThemes()
	}, [getThemes, newError, loader])
	return (
		<>
			<LayoutDashboard title="Setting">
				<div className="p-5">
					<Form className="flex flex-col gap-4" onSubmit={submitHandler}>
						<LayoutSettingParameter settingName="Theme">
							<ColorThemes themes={themes} onChangeTheme={themeChangeHandler} />
						</LayoutSettingParameter>
						<LayoutSettingParameter settingName="Round">
							<ChangeRound
								defaultValue={form.round}
								onChangeRound={roundChangeHandler}
							/>
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
