import React from "react";
import Header from "../Header";
import store from "../../assets/img/store.jpeg";
import counter from "../../assets/img/counter.jpg";
import "../../App.css";
import Menu from "./Menu";
import Notice from "./Notice";
import Information from "./Information";
import Top from "./Top";
import { useParams } from "react-router-dom";

const MainPage = () => {
  let page = useParams();

  const movePage = () => {
    //@ts-ignore
    switch (page.param) {
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
    <div className="bg-black flex flex-col  h-hull sm:h-screen sm:flex-row sm:place-items-center sm:m-0 ">
      {/* <div className="flex flex-col-reverse"> */}
      <div className="topImg">
        <img className="img1" src={store} alt="store" />
        <img className="img2" src={counter} alt="counter" />
      </div>
      <div className="w-full">
        <div className="w-full h-full">
          <Header />
          <div className="w-full my-0 container mx-auto sm:w-10/12 ">
            <div
              className="text-white overflow-scroll h-4/5"
              style={{ height: "70vh" }}
            >
              {movePage()}
            </div>
          </div>
        </div>
      </div>
      {/* </div> */}
    </div>
  );
};

export default MainPage;
