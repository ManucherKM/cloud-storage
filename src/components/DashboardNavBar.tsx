import { Remove, Restore, Share } from '@/assets/icons'
import { clsx } from 'clsx'
import { Button, Input } from 'kuui-react'
import { ChangeEvent, FC, HTMLAttributes, MouseEvent } from 'react'

export interface IDashboardNavBar extends HTMLAttributes<HTMLDivElement> {
	search?: string
	share?: boolean
	remove?: boolean
	restore?: boolean
	onSearch?: (e: ChangeEvent<HTMLInputElement> | undefined) => void
	onShare?: (e: MouseEvent<HTMLButtonElement>) => void
	onRemove?: (e: MouseEvent<HTMLButtonElement>) => void
	onRestore?: (e: MouseEvent<HTMLButtonElement>) => void
}

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
	function searchHandler(e: ChangeEvent<HTMLInputElement> | undefined) {
		if (onSearch) {
			onSearch(e)
		}
	}

	function shareHandler(e: MouseEvent<HTMLButtonElement>) {
		if (onShare) {
			onShare(e)
		}
	}

	function restoreHandler(e: MouseEvent<HTMLButtonElement>) {
		if (onRestore) {
			onRestore(e)
		}
	}

	function removeHandler(e: MouseEvent<HTMLButtonElement>) {
		if (onRemove) {
			onRemove(e)
		}
	}

	const styles = clsx([
		'w-full flex justify-between px-5 py-3 border-solid border-0 border-b border-[--kuui-black-250]',
		className,
	])
	return (
		<div className={styles} {...props}>
			<div className="flex justify-start items-center gap-2">
				{share && (
					<Button
						onClick={shareHandler}
						variant="navigate"
						className="text-[--kuui-black-250]"
					>
						<div className="flex items-center gap-1">
							<Share />
							Share
						</div>
					</Button>
				)}
				{remove && (
					<Button
						onClick={removeHandler}
						variant="navigate"
						className="text-[--kuui-black-250]"
					>
						<div className="flex items-center gap-1">
							<Remove />
							Remove
						</div>
					</Button>
				)}
				{restore && (
					<Button
						onClick={restoreHandler}
						variant="navigate"
						className="text-[--kuui-black-250]"
					>
						<div className="flex items-center gap-1">
							<Restore />
							Restore
						</div>
					</Button>
				)}
			</div>

			<Input
				className="border-[--kuui-black-250]"
				placeholder="Search"
				value={search}
				onChange={searchHandler}
			/>
		</div>
	)
}
