import React, { useContext, useState } from "react";
import "./header.scss";
import logo from "../assets/img/logo.jpg";
import { AuthContext } from "../AuthProvider";
import { useHistory } from "react-router-dom";

const Header = () => {
  const { currentPath, setCurrentPath } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const history = useHistory();
  const clickPage = (path) => {
    if (path === currentPath) return;
    if (path) {
      history.push(path);
      setCurrentPath(path);
    }
  };

  return (
    <div className="on">
      <div className="title text-3xl sm:text-4xl mx-auto sm:ml-20">
        <div className="flex justify-around">
          <div className="flex">
            <h1>Sukemasa</h1>
            <img src={logo} className="h-12 w-12 border-none ml-0 sm:ml-4" />
          </div>
          <div>
            <button
              onClick={() => {
                setOpen(!open);
              }}
            >
              {/* pcでは常に出る
              smでは押したら出る
              どうすれば... */}
              <svg
                // className={`${
                //   !open ? "block" : "hidden"
                // } sm:block h-6 w-6 fill-current text-white`}
                className={`sm:hidden h-6 w-6 fill-current text-white`}
                viewBox="0 0 24 24"
              >
                {open ? (
                  <path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z" />
                ) : (
                  <path d="M24 6h-24v-4h24v4zm0 4h-24v4h24v-4zm0 8h-24v4h24v-4z" />
                )}
              </svg>
            </button>{" "}
          </div>
        </div>
        {open && (
          <div
            onClick={(e) => {
              clickPage(e.target.id);
            }}
            className="text-lg flex flex-col w-full fixed bg-black z-10 "
          >
            <ul className="sm:flex sm:my-6 sm:justify-between sm:w-6/12 sm:text-xl text-center">
              <li>
                <button className="text-white py-2 hover:bg-gray-600" id="/top">
                  T0P
                </button>
              </li>
              <li>
                <button
                  className="text-white py-2 hover:bg-gray-600"
                  id="/menu"
                >
                  MENU
                </button>
              </li>
              <li>
                <button
                  className="text-white  py-2 hover:bg-gray-600"
                  id="/notice"
                >
                  NOTICE
                </button>
              </li>
              <li>
                <button
                  className="py-2 hover:bg-gray-600"
                  href="http://blog.sukemasa.net/"
                >
                  BLOG
                </button>
              </li>
              <li>
                <button
                  className="text-white py-2 hover:bg-gray-600"
                  id="information"
                >
                  INFORMATION
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>

      {/* <div
        className="sm:flex sm:my-6 sm:mx-auto sm:justify-between sm:w-10/12 sm:text-xl "
        onClick={(e) => {
          clickPage(e.target.id);
        }}
      >
        <button className="sm:text-white sm:hover:bg-gray-600" id="/top">
          TOP
        </button>
        <button className="sm:text-white sm:hover:bg-gray-600" id="/menu">
          MENU
        </button>
        <button className="sm:text-white sm:hover:bg-gray-600" id="notice">
          NOTICE
        </button>
        <button className="sm:text-white sm:hover:bg-gray-600">
          <a href="http://blog.sukemasa.net/"></a>blog
        </button>
        <button
          className="sm:text-white sm:hover:bg-gray-600"
          id="/information"
        >
          INFORMATION
        </button>
      </div> */}
    </div>
  );
};

export default Header;
