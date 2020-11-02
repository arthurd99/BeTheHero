import React from "react"

import "intl"
import "intl/locale-data/jsonp/en-US"

// Imports app routes
import Routes from "./src/Routes"

// App component
function App() {
	// HTML returned when the component is rendered
	return ( <Routes /> )
}

// Exports app
export default App
