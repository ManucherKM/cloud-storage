// Types
import type { ChangeEvent, FC, HTMLAttributes, MouseEvent } from 'react'

// Components
import { Input } from 'kuui-react'
import { NavigateButtonRemove } from './NavigateButtonRemove'
import { NavigateButtonRestore } from './NavigateButtonRestore'
import { NavigateButtonShare } from './NavigateButtonShare'

// Utils
import { clsx } from 'clsx'

/** `DashboardNavBar` component interface. */
export interface IDashboardNavBar extends HTMLAttributes<HTMLDivElement> {
	/** String on the basis of which the search will be performed. */
	search?: string

	/** Flag responsible for whether the `Share` button will be shown. */
	share?: boolean

	/** Flag responsible for whether the `Remove` button will be shown. */
	remove?: boolean

	/** Flag responsible for whether the `Restore` button will be shown. */
	restore?: boolean

	/**
	 * Handler function that will be executed each time the search query is
	 * changed.
	 *
	 * @param e Change event
	 */
	onSearch?: (e: ChangeEvent<HTMLInputElement> | undefined) => void

	/**
	 * Handler function that will be executed when clicking on the `Share` button.
	 *
	 * @param e Mouse event
	 */
	onShare?: (e: MouseEvent<HTMLButtonElement>) => void

	/**
	 * Handler function that will be executed when clicking on the `Remove`
	 * button.
	 *
	 * @param e Mouse event
	 */
	onRemove?: (e: MouseEvent<HTMLButtonElement>) => void

	/**
	 * Handler function that will be executed when clicking on the `Restore`
	 * button.
	 *
	 * @param e Mouse event
	 */
	onRestore?: (e: MouseEvent<HTMLButtonElement>) => void
}

/**
 * The `DashboardNavBar` component is a navigation bar for the dashboard.
 *
 * @example
 * 	;<DashboardNavBar search onSearch={console.log} />
 *
 * @param props Propses
 */
export const DashboardNavBar: FC<IDashboardNavBar> = ({
	onSearch,
	onShare,
	onRemove,
	onRestore,
	remove,
	restore,
	share,
	search,
	className,
	...props
}) => {
	/**
	 * Handler function that will be executed at each change of the search query.
	 *
	 * @param e Chage event
	 */
	function searchHandler(e: ChangeEvent<HTMLInputElement> | undefined) {
		// If the developer specified this handler, call it.
		if (onSearch) {
			onSearch(e)
		}
	}

	/**
	 * Handler function that will be executed when clicking on the "share" button.
	 *
	 * @param e Mouse event
	 */
	function shareHandler(e: MouseEvent<HTMLButtonElement>) {
		// If the developer specified this handler, call it.
		if (onShare) {
			onShare(e)
		}
	}

	/**
	 * Handler function that will be executed when clicking on the "restore"
	 * button.
	 *
	 * @param e Mouse event
	 */
	function restoreHandler(e: MouseEvent<HTMLButtonElement>) {
		// If the developer specified this handler, call it.
		if (onRestore) {
			onRestore(e)
		}
	}

	/**
	 * Handler function that will be executed when clicking on the "remove"
	 * button.
	 *
	 * @param e Mouse event
	 */
	function removeHandler(e: MouseEvent<HTMLButtonElement>) {
		// If the developer specified this handler, call it.
		if (onRemove) {
			onRemove(e)
		}
	}

	/** Required styles for the root block. */
	const styles = clsx([
		'w-full flex justify-between px-5 py-3 border-solid border-0 border-b border-black-250',
		className,
	])
	return (
		<div className={styles} {...props}>
			<div className="flex justify-start items-center gap-2">
				{share && <NavigateButtonShare onClick={shareHandler} />}
				{remove && <NavigateButtonRemove onClick={removeHandler} />}
				{restore && <NavigateButtonRestore onClick={restoreHandler} />}
			</div>

			<Input
				variant="text"
				className="border-black-250"
				placeholder="Search"
				value={search}
				onChange={searchHandler}
			/>
		</div>
	)
}
