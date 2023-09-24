import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { IStore } from './types'

export const useStore = create(
	persist<IStore>(
		set => ({
			isLoading: false,
			setLoading(target) {
				set({ isLoading: target })
			},
		}),
		{ name: 'store' },
	),
)
