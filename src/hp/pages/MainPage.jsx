import React from "react";
import Header from "../components/Header";
import store from "../../assets/img/store.jpeg";
import Menu from "./Menu";
import Notice from "./Notice";
import Information from "./Information";
import Top from "./Top";
import "../../App.css";
import { AuthContext } from "../../AuthProvider";
import { useContext } from "react";

const MainPage = () => {
  const { currentPath } = useContext(AuthContext);
  const movePage = () => {
    switch (currentPath) {
      case "top":
        return <Top />;
      case "menu":
        return <Menu />;
      case "information":
        return <Information />;
      case "notice":
        return <Notice />;
      default:
        break;
    }
  };
  return (
    <div className="background">
      <img
        src={store}
        style={{ borderRadius: "50%", height: 600, width: 600 }}
      />
      <div style={{ width: "100%" }}>
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
