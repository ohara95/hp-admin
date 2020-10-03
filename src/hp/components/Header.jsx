import React from "react";
import { Link } from "react-router-dom";
import "./header.scss";

const Header = () => {
  return (
    <div className="on">
      <h1 className="title">
        <Link to="/">亮昌</Link>
      </h1>
      <ul className="content">
        <li>
          <Link to="/menu">menu</Link>
        </li>
        <li>
          <Link to="/notice">notice</Link>
        </li>
        <li>
          <a href="http://blog.sukemasa.net/">blog</a>
        </li>
        <li>
          <Link to="/information">information</Link>
        </li>
        <li>
          <Link to="/login">admin</Link>
        </li>
      </ul>
    </div>
  );
};

export default Header;
