// Utils
import { useEffect, useState } from 'react'

/**
 * Use this hook to track the transfer of user files into the web application area.
 */
export const useWindowFilesTransfer = () => {
	/**
	 * File transfer state.
	 */
	const [isTransfer, setIsTransfer] = useState<boolean>(false)

	/**
	 * Function handler for the dragover event.
	 * @param e drag over event
	 */
	function dragOverHandler(e: DragEvent) {
		// Preventing default browser behavior.
		e.preventDefault()

		// We change the state of "isTransfer".
		setIsTransfer(true)
	}

	/**
	 *   Function handler for the dragleave event.
	 */
	function dragLeaveHandler() {
		// We change the state of "isTransfer".
		setIsTransfer(false)
	}

	/**
	 *  Function handler for the drop event.
	 * @param e drop event
	 */
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

		// Add a dragleave event to the window.
		window.addEventListener('dragleave', dragLeaveHandler)

		// Add a dragover event to the window.
		window.addEventListener('dragover', dragOverHandler)

		// When the component is dismantled, the callback below will be called.
		return () => {
			window.removeEventListener('drop', dropHandler)
			window.removeEventListener('dragleave', dragLeaveHandler)
			window.removeEventListener('dragover', dragOverHandler)
		}
	}, [])

	return isTransfer
}
