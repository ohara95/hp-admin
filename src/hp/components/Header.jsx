import React, { useContext } from "react";
import "./header.scss";
import logo from "../../assets/img/logo.jpg";
import { AuthContext } from "../../AuthProvider";

const Header = () => {
  const { setCurrentPath } = useContext(AuthContext);
  return (
    <div className="on">
      <div className="title">
        <div style={{ display: "flex" }}>
          <h1>Sukemasa</h1>
          <img
            src={logo}
            style={{
              height: 50,
              width: 50,
              borderStyle: "none",
              marginLeft: 10,
            }}
          />
        </div>
      </div>
      <ul
        className="content"
        onClick={(e) => {
          setCurrentPath(e.target.value);
        }}
      >
        <li>
          <button style={{ color: "white" }} value="top">
            top
          </button>
        </li>
        <li>
          <button style={{ color: "white" }} value="menu">
            menu
          </button>
        </li>
        <li>
          <button style={{ color: "white" }} value="notice">
            notice
          </button>
        </li>
        <li>
          <a href="http://blog.sukemasa.net/">blog</a>
        </li>
        <li>
          <button style={{ color: "white" }} value="information">
            information
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Header;
