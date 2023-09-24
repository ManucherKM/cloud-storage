import { FC, ReactNode } from 'react'

export interface IList<T> {
	arr: T[]
	callback: (item: T, idx: number, arr: T[]) => ReactNode
}

export function List<T>({ arr, callback }: IList<T>) {
	return <>{arr.map(callback)}</>
}
