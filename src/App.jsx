import React, { useContext } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { AuthProvider, AuthContext } from "./AuthProvider";
import MainPage from "./hp/pages/MainPage";
import Management from "./admin/pages/Management";
import Edit from "./admin/pages/Edit";
import LoggedInRoute from "./LoggedInRoute";
import "./App.css";
import Menu from "./hp/pages/Menu";
import SignUp from "./admin/pages/SignUp";
import SignIn from "./admin/pages/SignIn";
import Notice from "./hp/pages/Notice";
import Information from "./hp/pages/Information";
import Top from "./hp/pages/Top";
import ResetPassword from "./admin/pages/ResetPassword";

const App = () => {
  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={MainPage} />
            <Route path="/signup" component={SignUp} />
            <Route path="/confirm" component={ResetPassword} />
            <Route path="/login" component={SignIn} />
            <LoggedInRoute path="/management" component={Management} />
            <Route path="/top" component={Top} />
            <Route path="/menu" component={Menu} />
            <Route path="/notice" component={Notice} />
            <Route path="/information" component={Information} />
            <Route path="/edit" component={Edit} />
          </Switch>
        </BrowserRouter>
      </AuthProvider>
    </>
  );
};

export default App;
