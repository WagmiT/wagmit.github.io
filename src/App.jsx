import React from "react";
import "./App.css";
import { MainHeader } from "./component/Header/Header";
import { IndexPage } from "./route";
import { Web3Store } from "./store/Web3Store";
import { HashRouter as Router, Switch, Route, Link } from "react-router-dom";
import { NgmiNftPage } from "./route/ngmi-nft";
import {AnalyticsPage} from "./route/analytics"

function App() {
  return (
    <Web3Store>
      <Router>
        <div>
          <MainHeader />
          <Switch>
            <Route path="/ngmi-nft">
              <NgmiNftPage />
            </Route>
            <Route path="/analytics"><AnalyticsPage /></Route>
            <Route path="/">
              <IndexPage />
            </Route>
          </Switch>
        </div>
      </Router>
    </Web3Store>
  );
}

export default App;
