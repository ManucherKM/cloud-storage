/**
 * With this function you can check if there are empty values in the object.
 * @param obj The object to be checked.
 */
export function isObjectValuesEmpty(obj: Object) {
	let key: keyof typeof obj

	for (key in obj) {
		if (!obj[key]) {
			return true
		}
	}

	return false
}
