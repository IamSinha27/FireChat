import React from "react"

import { BrowserRouter as Router, Switch, Route } from "react-router-dom"

import { AuthProvider } from "../contexts/AuthContext"  

import Chats from "./Chats"
import Login from "./Login"
import Time from "./Time"

function App() {
  return (
    <div style={{ fontFamily: 'Avenir' }}>
      <Router>
      {/* wrapping components inside the authprovider context */}
        <AuthProvider>  
          <Switch>
            <Route path="/chats" component={Chats} />
            {/* <Route path="/time" component={Time}/> */}
            <Route path="/" component={Login} />    
            {/* the last one is always the default path */}
          </Switch>  
        </AuthProvider>
      </Router>
    </div>
  )
}

export default App
