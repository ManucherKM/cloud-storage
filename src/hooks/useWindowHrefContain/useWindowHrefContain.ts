import { useEffect, useState } from 'react'

export function useWindowHrefContain(str: string) {
	const [href, setHref] = useState<string>(window.location.href)

	useEffect(() => {
		setHref(window.location.href)
	}, [window.location.href])

	return href.includes(str)
}
