import React, { useContext } from "react";
import { Route, Link } from "react-router-dom";
import "./header.scss";
import Menu from "../pages/Menu";
import Notice from "../pages/Notice";
import Information from "../pages/Information";
import SignInUp from "../../admin/pages/SignIn_SignUp";
import { AuthContext } from "../../AuthProvider";

const Header = () => {
  const { currentPath, setCurrentPath } = useContext(AuthContext);
  console.log(currentPath);
  return (
    <div className="on">
      <h1 className="title">亮昌</h1>
      <ul className="content">
        <li>
          <p style={{ color: "white" }}>top</p>
        </li>
        <li>
          <Link to="/menu">menu</Link>
        </li>
        <li>
          <Route path="/notice" component={Notice} />
          <p style={{ color: "white" }}>notice</p>
        </li>
        <li>
          <a href="http://blog.sukemasa.net/">blog</a>
        </li>
        <li>
          <Route path="/information" component={Information} />
          <p style={{ color: "white" }}>information</p>
        </li>
      </ul>
    </div>
  );
};

export default Header;
