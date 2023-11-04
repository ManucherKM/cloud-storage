import { renderHook } from '@testing-library/react'
import { beforeEach, describe, expect, test, vi } from 'vitest'
import { useEffectSkipFirstRender } from './useEffectSkipFirstRender'

describe('Testing the useEffectSkipFirstRender hook.', () => {
	beforeEach(() => {
		vi.clearAllMocks()
	})

	test('The first render is skipped.', () => {
		const mockFn = vi.fn()

		renderHook(() => useEffectSkipFirstRender(mockFn, []))

		expect(mockFn).not.toHaveBeenCalled()
	})

	// test('The function is called when re-rendering.', () => {
	// 	const mockFn = vi.fn()

	// 	const { rerender } = renderHook(() => useEffectSkipFirstRender(mockFn, []))

	// 	expect(mockFn).toHaveBeenCalledTimes(1)
	// })
})
