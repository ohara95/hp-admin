import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import MainPage from "./hp/pages/MainPage";
import Menu from "./hp/pages/Menu";
import Notice from "./hp/pages/Notice";
import Recruit from "./hp/pages/Recruit";
import Information from "./hp/pages/Information";
import Header from "./hp/components/Header";
import SignIn from "./admin/components/SignIn";
import Management from "./admin/pages/Management";
import Edit from "./admin/pages/Edit";
import "./App.css";
// import "./tailwind.css";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Switch>
          <Route exact path="/" component={MainPage} />
          <Route exact path="/menu" component={Menu} />
          <Route exact path="/recruit" component={Recruit} />
          <Route exact path="/notice" component={Notice} />
          <Route exact path="/information" component={Information} />
          <Route exact path="/signin" component={SignIn} />
          <Route exact path="/management" component={Management} />
          <Route exact path="/edit" component={Edit} />
        </Switch>
      </BrowserRouter>
    </>
  );
};

export default App;
