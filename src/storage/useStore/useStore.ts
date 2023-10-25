import { create } from 'zustand'
import { IStore } from './types'

const defaultStore = {
	isLoading: false,
}

export const useStore = create<IStore>(set => ({
	...defaultStore,
	setLoading(target) {
		set({ isLoading: target })
	},
	reset() {
		set(defaultStore)
	},
}))
