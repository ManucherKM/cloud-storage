import { App, CustomRouter } from '@/components'
import { GoogleOAuthProvider } from '@react-oauth/google'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { env } from './configuration/env'
import { history } from './configuration/history'

const root = ReactDOM.createRoot(document.getElementById('root')!)

const GOOGLE_CLIENT_ID = env.get('GOOGLE_CLIENT_ID').required().asString()

root.render(
	<React.StrictMode>
		<GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
			<CustomRouter history={history}>
				<App />
			</CustomRouter>
		</GoogleOAuthProvider>
	</React.StrictMode>,
)
