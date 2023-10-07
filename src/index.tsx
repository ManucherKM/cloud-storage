import { App } from '@/components'
import { GoogleOAuthProvider } from '@react-oauth/google'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { env } from './configuration/env'

const root = ReactDOM.createRoot(document.getElementById('root')!)

const GOOGLE_CLIENT_ID = env.get('GOOGLE_CLIENT_ID').required().asString()

root.render(
	<React.StrictMode>
		<GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</GoogleOAuthProvider>
	</React.StrictMode>,
)
