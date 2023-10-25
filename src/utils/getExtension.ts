/**
 * With this function you can get the file name and extension.
 *
 * @param fileName File name
 * @returns A tuple in which the first element is the file name, and the second
 *   is its extension.
 */
export function getExtension(fileName: string) {
	// We return a tuple.
	return fileName.split('.')
}
