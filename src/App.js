import "./App.css";
import React, { useState, useEffect } from "react";
import { AccountBox } from "./pages/AccountBox";
import Dashboard  from "./pages/Dashboard";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import { PrivateRoute } from "./helpers/authroute";

function App() {
  
  return (
        <Router>
          <Switch>
            <Route exact path="/" component={AccountBox} />
            <PrivateRoute
              exact
              path="/dashboard"
              component={Dashboard}
            />
          </Switch>
        </Router>
  );
}

export default App;
