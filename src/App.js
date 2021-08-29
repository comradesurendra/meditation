import "./App.css";
import React from "react";
import { Home } from "./pages/Home";
import { Dashboard } from "./pages/Dashboard";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import { PrivateRoute } from "./helpers/authroute";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <PrivateRoute exact path="/dashboard" component={Dashboard} />
      </Switch>
    </Router>
  );
}

export default App;
