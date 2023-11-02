import { afterAll, describe, expect, test, vi } from 'vitest'
import { writeTextIntoClipboard } from './writeTextIntoClipboard'

describe('Testing the writeTextIntoClipboard function.', () => {
	const text = 'Test text'

	test('The text has been added to the clipboard.', async () => {
		const writeText = vi.fn()

		Object.assign(navigator, {
			clipboard: {
				writeText,
			},
		})

		expect(await writeTextIntoClipboard(text)).toBe(true)
		expect(writeText).toHaveBeenCalled()
	})

	afterAll(() => {
		vi.clearAllMocks()
	})
})
