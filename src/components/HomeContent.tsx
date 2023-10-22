// Types
import type { FC } from 'react'

// Components
import { Link } from 'kuui-react'
import { NavBar } from './NavBar'

/**
 * Home Page Content.
 *
 * @example
 * 	;<HomeContent />
 */
export const HomeContent: FC = () => {
	return (
		<>
			<NavBar />
			<header>
				<div className="container">
					<div className="flex flex-col justify-center items-center mt-12 gap-4">
						<Link
							target="_blank"
							to="https://github.com/ManucherKM/cloud-storage"
							className="text-[40px] tb_sm:text-2xl ph_lg:text-lg"
							align="center"
						>
							Cloud storage | React
						</Link>
					</div>
				</div>
			</header>
		</>
	)
}
