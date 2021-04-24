import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import React from "react"
import Home from "./pages/AWTool"

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
      </Switch>
    </Router>
  )
}

export default App
