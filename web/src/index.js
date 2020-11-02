/**
 * After ../public/index.html is executed, this js file runs
 */

import React from "react"
import ReactDOM from "react-dom"
import App from "./App" // Imports main app

// Renders the app inside the root component from HTML
ReactDOM.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
	document.getElementById("root")
)
