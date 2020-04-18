import React from "react"
import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"

// Creates an instance of a stack navigator (navigation just with buttons)
const AppStack = createStackNavigator()

// Imports all components
import Incidents from "./pages/Incidents"
import Detail from "./pages/Detail"

// Routes component
function Routes() {
  // Html returned when the component is rendered
  return (
    // NavigationContainer is the main route component, it will alway gonna be outside everything
    <NavigationContainer>
      <AppStack.Navigator screenOptions={{ headerShown: false }}>
        <AppStack.Screen name="Incidents" component={Incidents} />
        <AppStack.Screen name="Detail" component={Detail} />
      </AppStack.Navigator>
    </NavigationContainer>
  )
}

// Exports routes
export default Routes
