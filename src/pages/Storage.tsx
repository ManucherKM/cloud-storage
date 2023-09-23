import { FC } from 'react'

export const Storage: FC = () => {
	return (
		<div className="w-full h-full p-5">
			<div className="w-full h-full bg-[--kuui-black-500] rounded-xl flex overflow-hidden">
				<div className="w-full min-w-[200px] max-w-[300px] bg-blue-400">
					test 2
				</div>

				<div className="w-full bg-red-400">test 1</div>
			</div>
		</div>
	)
}
