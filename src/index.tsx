// Libs
import React from 'react'
import ReactDOM from 'react-dom/client'

// Components
import { App, CustomRouter } from '@/components'
import { GoogleOAuthProvider } from '@react-oauth/google'

// Utils
import { env } from './configuration/env'
import { history } from './configuration/history'

/** The element into which the web application will be rendered. */
const root = ReactDOM.createRoot(document.getElementById('root')!)

/** Google client ID for correct interaction with the api. */
const GOOGLE_CLIENT_ID = env.get('GOOGLE_CLIENT_ID').required().asString()

// 1
root.render(
	<React.StrictMode>
		<GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
			<CustomRouter history={history}>
				<App />
			</CustomRouter>
		</GoogleOAuthProvider>
	</React.StrictMode>,
)
