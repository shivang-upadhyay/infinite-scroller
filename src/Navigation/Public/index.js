import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import Login from "../../Components/login";

export default function AppRouter(props) {
  return (
    <Router>
        <Switch>
          <Route path="/">
            <Login />
          </Route>
        </Switch>
    </Router>
  );
}