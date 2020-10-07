import React, { useContext } from "react";
import "./header.scss";
import logo from "../../assets/img/logo.jpg";
import { AuthContext } from "../../AuthProvider";
import { Link } from "react-router-dom";

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
        <li style={{ color: "white" }}>
          <Link to="/top">TOP</Link>
        </li>
        <li style={{ color: "white" }}>
          <Link to="/menu">MENU</Link>
        </li>
        <li style={{ color: "white" }}>
          <Link to="/notice">NOTICE</Link>
        </li>
        <li>
          <a href="http://blog.sukemasa.net/">blog</a>
        </li>
        <li style={{ color: "white" }}>
          <Link to="/information">INFORMATION</Link>
        </li>
      </ul>
    </div>
  );
};

export default Header;
