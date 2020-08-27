import React, { useContext } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { AuthProvider } from "./AuthProvider";
import MainPage from "./hp/pages/MainPage";
import Menu from "./hp/pages/Menu";
import Notice from "./hp/pages/Notice";
import Information from "./hp/components/Information";
import Header from "./hp/components/Header";
import SignInUp from "./admin/pages/SignIn_SignUp";
import Management from "./admin/pages/Management";
import Edit from "./admin/pages/Edit";
import LoggedInRoute from "./LoggedInRoute";
import "./App.css";
// import "./tailwind.ss";

const App = () => {
  const user = useContext(AuthProvider);
  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={MainPage} className="back" />
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
