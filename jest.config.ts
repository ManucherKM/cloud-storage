import type { Config } from 'jest'

const config: Config = {	
	preset: 'ts-jest',
	testEnvironment: 'jest-environment-jsdom',
	transform: {
		'^.+\\.tsx?$': 'ts-jest',
	},
}

export default config
