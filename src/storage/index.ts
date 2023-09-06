import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface IStore {
	count: number
}

export const useStore = create(
	persist<IStore>(
		(set, get) => ({
			count: 0,
		}),
		{ name: 'store' },
	),
)
