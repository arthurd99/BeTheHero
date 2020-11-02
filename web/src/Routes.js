import React from "react"
import { BrowserRouter, Route, Switch } from "react-router-dom"

// importing all components
import Logon from "./pages/Logon"
import Register from "./pages/Register"
import Profile from "./pages/Profile"
import NewIncident from "./pages/NewIncident"

function Routes() {
	return (
	// BrowserRouter is the main route component, it will always be outside everything
	<BrowserRouter>
		{/** Switch is a component that ensures that
		 only one route is executed at the same time */}
		 <Switch>
			 {/** set all routes from the frontend */}
			 <Route path="/" exact component={Logon} />
			 <Route path="/register" component={Register} />
			 <Route path="/profile" component={Profile} />
			 <Route path="/incidents/new" component={NewIncident} />
		 </Switch>
	</BrowserRouter>
	)
}

// Exports routes
export default Routes
