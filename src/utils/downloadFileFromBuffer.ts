export function downloadFileFromBuffer(buffer: Buffer) {
	const url = window.URL.createObjectURL(new Blob([buffer]))
	const link = document.createElement('a')
	link.href = url
	link.setAttribute('download', 'cloud-storage.zip')
	document.body.appendChild(link)
	link.click()
	link.remove()
}
