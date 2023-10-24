// Types
import type { FC } from 'react'

// Components
import { Button, Paragraph } from 'kuui-react'

// Utils
import { useLoader } from '@/hooks'
import { useFileStore, useNotificationsStore } from '@/storage'
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

	// Function to create a new error to show it to the user.
	const newError = useNotificationsStore(store => store.newError)

	/** Function for downloading an archive from the API. */
	const downloadArchive = useFileStore(store => store.downloadArchive)

	// A function for showing Loader to the user when requesting an API.
	const loader = useLoader()

	/**
	 * Handler function that will be processed when clicking on the "download"
	 * button.
	 */
	async function clickHandler() {
		// If the identifier is not found, stop executing the function.
		if (!id) return false

		const isSuccess = await loader(downloadArchive, id)

		// If the archive could not be downloaded.
		if (!isSuccess) {
			// Show the user an error message.
			newError('Failed to download archive.')

			// Terminate the function.
			return
		}
	}

	return (
		<div className="max-w-sm flex flex-col gap-3 p-5">
			<Paragraph align="center">
				To download the archive with files, click on the button.
			</Paragraph>
			<div className="text-center">
				<Button onClick={clickHandler}>Download</Button>
			</div>
		</div>
	)
}
