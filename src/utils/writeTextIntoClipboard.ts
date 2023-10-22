/**
 * With this function you can put text into the user's buffer.
 *
 * @param text The text to be placed in the user's buffer.
 */
export async function writeTextIntoClipboard(text: string) {
	try {
		await navigator.clipboard.writeText(text)
		return true
	} catch (e) {
		console.error(e)
	}
}
