import React, { useContext } from "react";
import "./header.scss";
import logo from "../../assets/img/logo.jpg";
import { AuthContext } from "../../AuthProvider";
import { useHistory } from "react-router-dom";

const Header = () => {
  const { currentPath, setCurrentPath } = useContext(AuthContext);
  const history = useHistory();
  const clickPage = (path) => {
    if (path === currentPath) return;
    history.push(path);
    setCurrentPath(path);
  };
  console.log(currentPath);

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
      <div
        className="content"
        onClick={(e) => {
          clickPage(e.target.id);
        }}
      >
        <div style={{ color: "white" }} id="/top">
          TOP
        </div>
        <div style={{ color: "white" }} id="/menu">
          MENU
        </div>
        <div style={{ color: "white" }} id="notice">
          NOTICE
        </div>
        <div>
          <a href="http://blog.sukemasa.net/">blog</a>
        </div>
        <div style={{ color: "white" }} id="/information">
          INFORMATION
        </div>
      </div>
    </div>
  );
};

export default Header;
