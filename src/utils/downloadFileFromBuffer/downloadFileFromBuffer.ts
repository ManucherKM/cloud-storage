/**
 * Using this function, you can install the file within the browser.
 *
 * @param buffer A file in the "Buffer" format that needs to be installed.
 */
export function downloadFileFromBuffer(buffer: Buffer) {
	// 	We create a local link through which the user can install the file.
	const url = window.URL.createObjectURL(new Blob([buffer]))

	// Create the "a" tag.
	const link = document.createElement('a')

	// We indicate the link in the "a" tag.
	link.href = url

	// Add an attribute for the "a" tag.
	link.setAttribute('download', 'cloud-storage.zip')

	// Add the created "a" tag to the end of the HTML document.
	document.body.appendChild(link)

	// Click on it instead of the user.
	link.click()

	// After the user selects the path where the file will be installed, we remove the created “a” tag.
	link.remove()
}
