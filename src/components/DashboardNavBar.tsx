import { clsx } from 'clsx'
import { Input } from 'kuui-react'
import { ChangeEvent, FC, HTMLAttributes } from 'react'

export interface IDashboardNavBar extends HTMLAttributes<HTMLDivElement> {
	onSearch: (e: ChangeEvent<HTMLInputElement> | undefined) => void
	search: string
}

export const DashboardNavBar: FC<IDashboardNavBar> = ({
	onSearch,
	search,
	className,
	...props
}) => {
	function searchHandler(e: ChangeEvent<HTMLInputElement> | undefined) {
		onSearch(e)
	}

	const styles = clsx([
		'w-full flex justify-end px-5 py-3 border-solid border-0 border-b border-[--kuui-black-250]',
		className,
	])
	return (
		<div className={styles} {...props}>
			<Input
				className="border-[--kuui-black-250]"
				placeholder="Search"
				value={search}
				onChange={searchHandler}
			/>
		</div>
	)
}
