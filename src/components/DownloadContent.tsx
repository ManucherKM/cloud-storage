import { AlertError } from '@/components'
import { useFileStore, useStore } from '@/storage'
import { Button, Paragraph } from 'kuui-react'
import { FC, useState } from 'react'
import { useParams } from 'react-router'

export const DownloadContent: FC = () => {
	const { id } = useParams()

	const [error, setError] = useState<string>('')

	const downloadArchive = useFileStore(store => store.downloadArchive)
	const setLoading = useStore(store => store.setLoading)

	async function clickHandler() {
		if (!id) {
			return false
		}

		setLoading(true)

		const isSuccess = await downloadArchive(id)

		if (!isSuccess) {
			setError('Failed to download archive.')
			setLoading(false)
			return
		}

		setLoading(false)
	}

	function errorTimeHandler() {
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
