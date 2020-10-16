import React from "react";
import Header from "../components/Header";
import store from "../../assets/img/store.jpeg";
import counter from "../../assets/img/counter.jpg";
import "../../App.css";
import { AuthContext } from "../../AuthProvider";
import { useContext } from "react";
import Menu from "./Menu";
import Notice from "./Notice";
import Information from "./Information";
import Top from "./Top";
import { useParams } from "react-router-dom";
// import main from "./main.scss";

const MainPage = () => {
  let p = useParams();
  const movePage = () => {
    switch (p.param) {
      case "top":
        return <Top />;
      case "menu":
        return <Menu />;
      case "information":
        return <Information />;
      case "notice":
        return <Notice />;
      default:
        return <Top />;
    }
  };
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
              {movePage()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
