// Types
import type { FC } from 'react'

// Icons
import { Logo } from '@/assets/icons'
import { ERoutes } from '@/configuration/routes'

// Components
import { Button, Link } from 'kuui-react'

/**
 * Navigation Menu.
 *
 * @example
 * 	;<NavBar />
 */
export const NavBar: FC = () => {
	return (
		<nav className="bg-[--kuui-black-500] py-2">
			<div className="container">
				<div className="flex justify-between items-center">
					<Link target="_blank" to="https://github.com/manucherkm">
						<Logo />
					</Link>

					<div className="flex gap-3">
						<Link to={ERoutes.login} className="whitespace-nowrap">
							<Button variant="navigate">Sign in</Button>
						</Link>
						<Link to={ERoutes.registration} className="whitespace-nowrap">
							<Button variant="active">Login</Button>
						</Link>
					</div>
				</div>
			</div>
		</nav>
	)
}
