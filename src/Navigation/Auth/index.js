import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import InfiniteScroll from "../../Components/infiniteScroll";

export default function AppRouter() {
  return (
    <Router>
        <Switch>
          <Route path="/home">
            <InfiniteScroll />
          </Route>
          <Route path="/">
            <InfiniteScroll />
          </Route>
        </Switch>
    </Router>
  );
}