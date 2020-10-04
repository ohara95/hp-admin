import React, { useContext } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { AuthProvider, AuthContext } from "./AuthProvider";
import MainPage from "./hp/pages/MainPage";
import Management from "./admin/pages/Management";
import Edit from "./admin/pages/Edit";
import LoggedInRoute from "./LoggedInRoute";
import "./App.css";
import Information from "./hp/pages/Information";
import Menu from "./hp/pages/Menu";
import Top from "./hp/pages/Top";
import Notice from "./hp/pages/Notice";
import SignInUp from "./admin/pages/SignIn_SignUp";

const App = () => {
  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={MainPage} />
            <Route exact path="/top" component={Top} />
            <Route exact path="/menu" component={Menu} />
            <Route exact path="/notice" component={Notice} />
            <Route exact path="/information" component={Information} />
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
