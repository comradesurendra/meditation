import "./App.css";
import React, { useState, useEffect } from "react";
import { AccountBox } from "./pages/AccountBox";
import { User } from "./pages/User";
import { Trainer } from "./pages/Trainer";
import { UserAuthData } from "./helpers/accountContext";
import {
  Route,
  BrowserRouter as Router,
  Switch,
} from "react-router-dom";
import {PrivateRoute} from "./helpers/authroute"

function App() {
  const [auth, setAuth] = useState(false);
  const [data, setdata] = useState({});
  useEffect(() => {
    if(localStorage.getItem("token")){
      setAuth(true);
    }
  }, [auth]);
  return (
    <UserAuthData.Provider value={(auth, setAuth, data, setdata)}>
      <Router>
        <Switch>
          <Route exact path="/"  component={AccountBox} />
          <PrivateRoute exact path="/user"  component={User} />
          <PrivateRoute exact path="/trainer"  component={Trainer} />
        </Switch>
      </Router>
    </UserAuthData.Provider>
  );
}

export default App;
