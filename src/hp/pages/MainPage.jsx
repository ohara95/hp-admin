import React from "react";
import Information from "../components/Information";
import Header from "../components/Header";
import store from "../../assets/img/store.jpeg";
import "./main.css";

const MainPage = () => {
  return (
    <div className="background">
      <img
        src={store}
        style={{ borderRadius: "50%", height: 600, width: 600 }}
      />
      <Header />
      {/* <Information /> */}
    </div>
  );
};

export default MainPage;
