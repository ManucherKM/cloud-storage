// Types
import type { IStore } from './types'

// Utils
import { create } from 'zustand'

// Default storage object.
const defaultStore = {
	isLoading: false,
} as IStore

/** With this hook you can access shared storage. */
export const useStore = create<IStore>(set => ({
	...defaultStore,
	setLoading(target) {
		// Changing the loading state.
		set({ isLoading: target })
	},
	reset() {
		// Reset the storage to its original state.
		set(defaultStore)
	},
}))
