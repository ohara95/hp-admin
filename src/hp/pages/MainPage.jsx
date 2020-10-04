import React from "react";
import Header from "../components/Header";
import store from "../../assets/img/store.jpeg";
import Menu from "./Menu";
import Notice from "./Notice";
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
          <div style={{ width: "80%", margin: "0 auto" }}>
            <div
              style={{
                background: "white",
                height: "70vh",
                overflow: "scroll",
              }}
            >
              <Notice />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
