import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { AuthProvider } from "./AuthProvider";
import MainPage from "./components/pages/MainPage";
import "./App.css";

const App = () => {
  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <Switch>
            <Route exact path="/:param" component={MainPage} />
            <Route path="/" component={MainPage} />
          </Switch>
        </BrowserRouter>
      </AuthProvider>
    </>
  );
};

export default App;
