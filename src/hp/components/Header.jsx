import React, { useContext } from "react";
import "./header.scss";
import { AuthContext } from "../../AuthProvider";

const Header = () => {
  const { currentPath, setCurrentPath } = useContext(AuthContext);
  console.log(currentPath);
  return (
    <div className="on">
      <h1 className="title">Sukemasa</h1>
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
