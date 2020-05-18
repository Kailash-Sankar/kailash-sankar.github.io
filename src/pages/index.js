import React, { Suspense } from "react";
import { HashRouter as Router, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "@store/root";
import { connecter } from "@store/base";
import Home from "./Home";

//const TopBar = lazy(() => import("@components/Navigation/TopBar"));

function App() {
  return (
    <Router>
      <Suspense fallback={<div>loading...</div>}>
        <Route exact path="/">
          <Home />
        </Route>
      </Suspense>
    </Router>
  );
}

const AppHOC = connecter(App);

const AppWrapper = () => (
  <Provider store={store}>
    <AppHOC />
  </Provider>
);

export default AppWrapper;
