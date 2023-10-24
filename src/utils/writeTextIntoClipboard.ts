/**
 * With this function you can put text into the user's buffer.
 *
 * @param text The text to be placed in the user's buffer.
 */
export async function writeTextIntoClipboard(text: string) {
	try {
		// We write the text to the user's buffer.
		await navigator.clipboard.writeText(text)
		return true
	} catch (e) {
		console.error(e)
	}
}
