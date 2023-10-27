/** Shared storage. */
export interface IStore {
	/** Loading status. */
	isLoading: boolean

	/** Function for changing the download state. */
	setLoading: (target: boolean) => void

	/** Function to reset the storage to its original state. */
	reset: () => void
}
