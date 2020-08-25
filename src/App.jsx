import React, { useContext } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { AuthProvider } from "./AuthProvider";
import MainPage from "./hp/pages/MainPage";
import Menu from "./hp/pages/Menu";
import Notice from "./hp/pages/Notice";
import Recruit from "./hp/pages/Recruit";
import Information from "./hp/pages/Information";
import Header from "./hp/components/Header";
import SignInUp from "./admin/pages/SignIn_SignUp";
import Management from "./admin/pages/Management";
import Edit from "./admin/pages/Edit";
import "./App.css";
// import "./tailwind.ss";

const App = () => {
  const user = useContext(AuthProvider);
  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          {user && <Header />}
          <Switch>
            <Route exact path="/" component={MainPage} />
            <Route exact path="/menu" component={Menu} />
            <Route exact path="/recruit" component={Recruit} />
            <Route exact path="/notice" component={Notice} />
            <Route exact path="/information" component={Information} />
            <Route
              exact
              path="/signinup"
              render={() =>
                user ? <Redirect to={"/management"} /> : <SignInUp />
              }
            />
            <Route exact path="/management" component={Management} />
            <Route exact path="/edit" component={Edit} />
          </Switch>
        </BrowserRouter>
      </AuthProvider>
    </>
  );
};

export default App;
