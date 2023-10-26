// Types
import type { Dispatch, SetStateAction } from 'react'

// Utils
import { useEffect, useState } from 'react'

/**
 * Use this hook to track the transfer of user files into the web application
 * area.
 */
export const useWindowFilesTransfer = () => {
	//  File transfer state.
	const [isTransfer, setIsTransfer] = useState<boolean>(false)

	// Function handler for the dragover event.
	function dragOverHandler(e: DragEvent) {
		// Preventing default browser behavior.
		e.preventDefault()

		// We change the state of "isTransfer".
		setIsTransfer(true)
	}

	// Function handler for the drop event.
	function dropHandler(e: DragEvent) {
		// Preventing default browser behavior.
		e.preventDefault()

		// We change the state of "isTransfer".
		setIsTransfer(false)
	}

	// Call the callback on the first render.
	useEffect(() => {
		// Add a drop event to the window.
		window.addEventListener('drop', dropHandler)

		// Add a dragover event to the window.
		window.addEventListener('dragover', dragOverHandler)

		// When the component is dismantled, the callback below will be called.
		return () => {
			window.removeEventListener('drop', dropHandler)
			window.removeEventListener('dragover', dragOverHandler)
		}
	}, [])

	// Returning the isTransfer state.
	return [isTransfer, setIsTransfer] as [
		boolean,
		Dispatch<SetStateAction<boolean>>,
	]
}
