// Types
import type { ReactNode } from 'react'

/** `List` component interface */
export interface IList<T> {
	/** The array that will be iterated over. */
	arr: T[]

	/**
	 * Collback that will be called for each element of the array.
	 *
	 * @param item Array Element.
	 * @param idx Index of the element in the array.
	 * @param arr The original array.
	 */
	callback: (item: T, idx: number, arr: T[]) => ReactNode
}

/**
 * A component for rendering lists.
 *
 * @example
 * 	;<List arr={[1, 2, 3]} callback={num => <span>{num}</span>} />
 *
 * @param props Propses
 */
export function List<T>({ arr, callback }: IList<T>) {
	return arr.map(callback)
}
