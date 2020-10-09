import React, { useContext } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { AuthProvider, AuthContext } from "./AuthProvider";
import MainPage from "./hp/pages/MainPage";
import Management from "./admin/pages/Management";
import Edit from "./admin/pages/Edit";
import LoggedInRoute from "./LoggedInRoute";
import "./App.css";
import SignInUp from "./admin/pages/SignIn_SignUp";
import Menu from "./hp/pages/Menu";
import Notice from "./hp/pages/Notice";
import Information from "./hp/pages/Information";
import Top from "./hp/pages/Top";

const App = () => {
  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={MainPage} />
            <Route path="/top" component={Top} />
            <Route path="/menu" component={Menu} />
            <Route path="/notice" component={Notice} />
            <Route path="/information" component={Information} />
            <LoggedInRoute path="/management" component={Management} />
            <Route path="/edit" component={Edit} />
            <Route path="/login" component={SignInUp} />
          </Switch>
        </BrowserRouter>
      </AuthProvider>
    </>
  );
};

export default App;
