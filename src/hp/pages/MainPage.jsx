import React from "react";
import Header from "../components/Header";
import store from "../../assets/img/store.jpeg";
import inStore from "../../assets/img/inStore.jpg";
import counter from "../../assets/img/counter.jpg";
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
      <div className="topImg">
        <img className="img1" src={store} alt="store" />
        <img className="img2" src={counter} alt="counter" />
      </div>
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
