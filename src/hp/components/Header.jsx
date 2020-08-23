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
          <Link to="/menu">メニュー</Link>
        </li>
        <li>
          <Link to="/notice">お知らせ</Link>
        </li>
        <li>
          <a href="http://blog.sukemasa.net/">ブログ</a>
        </li>
        <li>
          <Link to="/recruit">求人</Link>
        </li>
        <li>
          <Link to="/information">店舗情報</Link>
        </li>
        <li>
          <Link to="/signin">管理</Link>
        </li>
      </ul>
    </div>
  );
};

export default Header;
