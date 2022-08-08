import React, { useContext } from "react";
import { Route, Routes, Link } from "react-router-dom";

import UserContext from "../store/UserContext";
import StrangersContext from "../store/StrangersContext";

import DashboardWrapper from "../ui/DashboardWrapper";

import UserCard from "../components/user/UserCard";
import Nav from "../components/Nav";
import UserInfo from "../components/user/UserInfo";
import PostsContainer from "../components/posts/PostsContainer";
import Search from "../components/Search";
import UserPosts from "../components/posts/UserPosts";
import logoImg from "../assets/imgs/logo.svg";
import Site404 from "./Site404";
import Friends from "../components/friends/Friends";
import Users from "../components/users/Users";
import StrangerInfo from "./StrangerInfo";

import { PostsContextProvider } from "../store/PostsContext";
import { StrangersContextProvider } from "../store/StrangersContext";
import { FriendsContextProvider } from "../store/FriendsContext";
import FollowedPosts from "./FollowedPosts";

const Dashboard = () => {
  const userCtx = useContext(UserContext);
  const strangersCtx = useContext(StrangersContext);
  const friendsCtx = useContext(StrangersContext);

  const { token } = userCtx.userData;

  return (
    <DashboardWrapper>
      <div className="flex justify-between lg:flex-col">
        <div className="flex items-center justify-between gap-4 lg:flex-col">
          <img
            src={logoImg}
            className="w-32 lg:w-52 shadow-sm"
            alt="Moon Logotype"
          />
          <Nav />
        </div>
        <div>
          {!token && (
            <div className="flex gap-4">
              <Link to="/register">
                <button className="btn btn-primary w-full">Register</button>
              </Link>
              <Link to="/login" className="grow">
                <button className="btn btn-primary w-full">Login</button>
              </Link>
            </div>
          )}
          {token && <UserInfo />}
        </div>
      </div>
      <PostsContextProvider>
        <div className="divider lg:divider-horizontal lg:order-last p-2"></div>
        <div className="flex flex-col gap-4 lg:order-last">
          <StrangersContextProvider>
            <Search />
            {strangersCtx.strangers && <Users />}
          </StrangersContextProvider>
          <hr />
          fłiends
          <FriendsContextProvider>
            {token && friendsCtx && <Friends />}
          </FriendsContextProvider>
        </div>
        <div className="divider lg:divider-horizontal p-2"></div>
        <div className="grid grow gap-4 flex-1">
          <Routes>
            <Route path="*" element={<Site404 />} />
            <Route path="/" element={<PostsContainer />} />
            <Route path="/usersettings" element={<UserCard />} />
            <Route path="/myposts" element={<UserPosts />} />
            <Route path="/strangerinfo" element={<StrangerInfo />} />
            <Route path="/followedposts" element={<FollowedPosts />} />
          </Routes>
        </div>
      </PostsContextProvider>
    </DashboardWrapper>
  );
};

export default Dashboard;
