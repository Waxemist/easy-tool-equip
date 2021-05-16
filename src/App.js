import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import React from "react"
import Home from "./pages/Home"
import Teleport from "./pages/AWTeleport"
import Tool from "./pages/AWTool"
import { LandsProvider } from "src/context/LandsContext"
function App() {
  return (
    <LandsProvider>
      <Router>
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/teleport" exact>
            <Teleport />
          </Route>
          <Route path="/tool-equip" exact>
            <Tool />
          </Route>
        </Switch>
      </Router>
    </LandsProvider>
  )
}

export default App
