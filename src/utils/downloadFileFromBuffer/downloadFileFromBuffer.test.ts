import { afterEach, describe, expect, test, vi } from 'vitest'
import { downloadFileFromBuffer } from './downloadFileFromBuffer'

describe('Testing the downloadFileFromBuffer function.', () => {
	const buffer = Buffer.from('Test')

	test('The URL for downloading the file locally has been created.', () => {
		window.URL.createObjectURL = vi.fn()

		const createObjectURL = vi.spyOn(URL, 'createObjectURL')

		downloadFileFromBuffer(buffer)

		expect(createObjectURL).toHaveBeenCalled()
	})

	test('An "a" tag was created in the document.', () => {
		window.URL.createObjectURL = vi.fn()

		const createElement = vi.spyOn(document, 'createElement')

		downloadFileFromBuffer(buffer)

		expect(createElement).toHaveBeenCalled()
	})

	test('The necessary attributes have been added.', async () => {
		window.URL.createObjectURL = vi.fn()

		const link = vi.mocked(document.createElement('a'))

		document.createElement = vi.fn(() => link)

		const setAttribute = vi.spyOn(link, 'setAttribute')

		downloadFileFromBuffer(buffer)

		expect(setAttribute).toHaveBeenCalled()
	})

	test('Whether an element has been added to the DOM.', () => {
		window.URL.createObjectURL = vi.fn()

		const link = vi.mocked(document.createElement('a'))

		document.createElement = vi.fn(() => link)

		const appendChild = vi.spyOn(document.body, 'appendChild')

		downloadFileFromBuffer(buffer)

		expect(appendChild).toHaveBeenCalled()
	})

	test('The link was clicked.', () => {
		window.URL.createObjectURL = vi.fn()

		const link = vi.mocked(document.createElement('a'))

		document.createElement = vi.fn(() => link)

		const click = vi.spyOn(link, 'click')

		downloadFileFromBuffer(buffer)

		expect(click).toHaveBeenCalled()
	})

	test('The link has been removed from the DOM.', () => {
		window.URL.createObjectURL = vi.fn()

		const link = vi.mocked(document.createElement('a'))

		document.createElement = vi.fn(() => link)

		const click = vi.spyOn(link, 'remove')

		downloadFileFromBuffer(buffer)

		expect(click).toHaveBeenCalled()
	})

	afterEach(() => {
		vi.clearAllMocks()
	})
})
