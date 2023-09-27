import { useEffect, useState } from 'react'

export const useWindowFilesTransfer = () => {
	const [isTransfer, setIsTransfer] = useState<boolean>(false)

	function dragOverHandler(e: DragEvent) {
		e.preventDefault()
		setIsTransfer(true)
	}

	function dragLeaveHandler() {
		setIsTransfer(false)
	}

	function dropHandler(e: DragEvent) {
		e.preventDefault()
		setIsTransfer(false)
	}

	useEffect(() => {
		window.addEventListener('drop', dropHandler)
		window.addEventListener('dragleave', dragLeaveHandler)
		window.addEventListener('dragover', dragOverHandler)

		return () => {
			window.removeEventListener('drop', dropHandler)
			window.removeEventListener('dragleave', dragLeaveHandler)
			window.removeEventListener('dragover', dragOverHandler)
		}
	}, [])

	return isTransfer
}
