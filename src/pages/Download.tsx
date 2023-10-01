import { useFileStore } from '@/storage'
import { Button } from 'kuui-react'
import { FC } from 'react'
import { useParams } from 'react-router'

export const Download: FC = () => {
	const { id } = useParams()

	const downloadArchive = useFileStore(store => store.downloadArchive)

	function clickHandler() {
		if (!id) {
			return false
		}

		const isSuccess = downloadArchive(id)
	}

	return (
		<div className="w-full h-full flex justify-center items-center">
			<Button onClick={clickHandler}>Download</Button>
		</div>
	)
}
