import React from "react";
import Information from "../components/Information";
import Header from "../components/Header";
import store from "../../assets/img/store.jpeg";
import "./main.css";

const MainPage = () => {
  return (
    <div>
      <img src={store} style={{ width: "100%", height: 400 }} />
      <Header />
      <Information />
    </div>
  );
};

export default MainPage;
