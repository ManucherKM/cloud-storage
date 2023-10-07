export interface IStore {
	isLoading: boolean
	setLoading: (target: boolean) => void
	reset: () => void
}
