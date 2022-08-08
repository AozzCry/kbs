import React, { useContext } from "react";

import { Link } from "react-router-dom";
import UserContext from "../store/UserContext";

const Nav = () => {
  const userContext = useContext(UserContext);
  const { token } = userContext;

  return (
    <>
      <ul className="z-10 fixed bottom-0 left-0 justify-around menu w-full lg:menu menu-horizontal bg-base-300 md:justify-around lg:rounded-box shadow-lg lg:static lg:mt-2">
        <li>
          <Link to="">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            <span className="hidden sm:block">News feed</span>
          </Link>
        </li>
        <li>
          <Link to="usersettings">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span className="hidden sm:block">User Settings</span>
          </Link>
        </li>
        <li>
          <Link to="myposts">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="w-4 h-4 mr-2 stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
              ></path>
            </svg>

            <span className="hidden sm:block">My posts</span>
          </Link>
        </li>
        <li>
          <Link to="followedposts">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="w-4 h-4 mr-2 stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
              ></path>
            </svg>

            <span className="hidden sm:block">Followed Posts</span>
          </Link>
        </li>
      </ul>
      {!token && (
        <Link to="/register">
          <button className="btn btn-active btn-primary">Register now!</button>
        </Link>
      )}
    </>
  );
};

export default Nav;
