import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { IStore } from './types'

const defaultStore = {
	isLoading: false,
}

export const useStore = create(
	persist<IStore>(
		set => ({
			...defaultStore,
			setLoading(target) {
				set({ isLoading: target })
			},
			reset() {
				set(defaultStore)
			},
		}),
		{ name: 'store' },
	),
)
