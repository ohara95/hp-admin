import React from "react";
import Header from "../components/Header";
import store from "../../assets/img/store.jpeg";
import "../../App.css";
import { AuthContext } from "../../AuthProvider";
import { useContext } from "react";
import Menu from "./Menu";
import Notice from "./Notice";
import Information from "./Information";
import Top from "./Top";
import { Route, Switch } from "react-router-dom";
// import main from "./main.scss";

const MainPage = () => {
  return (
    <div className="background">
      <img
        src={store}
        className="rounded-full"
        style={{ height: 600, width: 600 }}
      />
      <div className="w-full">
        <div className="headerStyle">
          <Header />
          <div style={{ width: "80%", margin: "0 auto" }}>
            <div
              style={{
                height: "70vh",
                overflow: "scroll",
                color: "white",
              }}
            >
              <Top />
              {/* <Switch>
                <Route path="/top" component={Top} />
                <Route path="/menu" component={Menu} />
                <Route path="/notice" component={Notice} />
                <Route path="/information" component={Information} />
              </Switch> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
