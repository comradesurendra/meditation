import "./App.css";
import React, { useState,useEffect } from "react";
import { AccountBox, User, Trainer } from "./pages/AccountBox";
import { UserAuthData } from "./helpers/accountContext";
import {
  Route,
  BrowserRouter as Router,
  Switch,
  Redirect,
} from "react-router-dom";

function App() {
  const [auth,setAuth] = useState(false);
  const [date,setdata] = useState({});
  useEffect(() =>{

  },[auth]);
  return (
    <UserAuthData.Provider value={auth,setAuth,date,setdata}>
      <Router>
        <Switch>
          <Route exact path="/" component={AccountBox} />
          {/* <PrivateRoute path="/user" authenticated={this.state.authenticated} component={User} />
      <PublicRoute path="/trainer" authenticated={this.state.authenticated} component={Trainer} /> */}
        </Switch>
      </Router>
    </UserAuthData.Provider>
  );
}

export default App;
