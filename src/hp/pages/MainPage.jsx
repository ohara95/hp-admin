import React from "react";
import Header from "../components/Header";
import store from "../../assets/img/store.jpeg";
import Menu from "./Menu";
import "./main.css";

const MainPage = () => {
  return (
    <div className="background">
      <img
        src={store}
        style={{ borderRadius: "50%", height: 600, width: 600 }}
      />
      <div style={{ width: "100%" }}>
        <div className="headerStyle">
          <Header />
          <div style={{ width: "90%", margin: "10 auto" }}>
            <Menu />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
