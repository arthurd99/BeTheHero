import React from "react"

import "intl"
import "intl/locale-data/jsonp/pt-BR"

// Imports app routes
import Routes from "./src/Routes"

// App component
function App() {
  // Html returned when the component is rendered
  return (
    <Routes />
  )
}

// Exports app
export default App
