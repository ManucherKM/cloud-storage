// Types
import type { FC } from 'react'

// Components
import { AlertError } from '@/components'
import { Button, Paragraph } from 'kuui-react'

// Utils
import { useFileStore, useStore } from '@/storage'
import { useState } from 'react'
import { useParams } from 'react-router'

/**
 * A component with the content of the `Download` page.
 *
 * @example
 * 	;<DownloadContent />
 */
export const DownloadContent: FC = () => {
	/** The identifier of the archive to download. */
	const { id } = useParams()

	/** State for errors */
	const [error, setError] = useState<string>('')

	/** Function for downloading an archive from the API. */
	const downloadArchive = useFileStore(store => store.downloadArchive)

	/** Function for changing the state of the Loader. */
	const setLoading = useStore(store => store.setLoading)

	/**
	 * Handler function that will be processed when clicking on the "download"
	 * button.
	 */
	async function clickHandler() {
		// If the identifier is not found, stop executing the function.
		if (!id) return false

		// Change the Loader state to true.
		setLoading(true)

		/**
		 * Put the result of the downloadArchive function execution into the
		 * isSuccess variable.
		 */
		const isSuccess = await downloadArchive(id)

		// If the archive could not be downloaded.
		if (!isSuccess) {
			// Show the user an error message.
			setError('Failed to download archive.')

			// Change the Loader state to false.
			setLoading(false)

			// Terminate the function.
			return
		}

		// Change the Loader state to false.
		setLoading(false)
	}

	/**
	 * A handler function that will be executed when the time for displaying the
	 * error message expires.
	 */
	function errorTimeHandler() {
		// Clearing the state with the error.
		setError('')
	}

	return (
		<div className="max-w-sm flex flex-col gap-3 p-5">
			<AlertError error={error} onTimeUp={errorTimeHandler} />
			<Paragraph align="center">
				To download the archive with files, click on the button.
			</Paragraph>
			<div className="text-center">
				<Button onClick={clickHandler}>Download</Button>
			</div>
		</div>
	)
}
