export function isObjectValuesEmpty(obj: Object) {
	let key: keyof typeof obj

	for (key in obj) {
		if (!obj[key]) {
			return true
		}
	}

	return false
}
