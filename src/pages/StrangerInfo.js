import React, { useContext } from "react";
import { useLocation } from "react-router-dom";

import API from "../env";
import UserContext from "../store/UserContext";
import Tag from "../ui/Tag";

const StrangerInfo = () => {
  const location = useLocation();
  const { stranger } = location.state;
  const { avatar_url, name, description, tags, email, id } = stranger;

  const ctx = useContext(UserContext);

  const sendFriendRequest = () => {
    fetch(`${API}/api/friends/${id}/add`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${ctx.userData.token}`,
      },
    });
  };
  const acceptFriendRequest = () => {
    fetch(`${API}/api/friends/${id}/accept`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${ctx.userData.token}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
  };

  return (
    <div className="card text-center bg-base-300">
      <div className="flex flex-col w-full">
        <div className="flex justify-between bg-base-200 p-4">
          <div className="avatar">
            <div className="w-24 rounded-full">
              <img src={`${API}${avatar_url}`} alt="User avatar" />
            </div>
          </div>
          <h2 className="card-title ml-2 flex-1">{name ? name : "Username"}</h2>
          <div className="flex items-center">
            <button className="btn btn-primary m-1" onClick={sendFriendRequest}>
              Add
            </button>
            <button
              className="btn btn-primary m-1"
              onClick={acceptFriendRequest}
            >
              Accept
            </button>
          </div>
        </div>

        <p>{description ? description : "Description"}</p>

        <div className="flex justify-center w-full gap-4">
          {tags
            ? tags.map((tag, index) => <Tag name={tag} key={index} />)
            : null}
        </div>
        {/*<div className="btn-group mt-6">*/}
        {/*  <button className="btn btn-accent btn-outline">Follow</button>*/}
        {/*  <button className="btn btn-accent btn-outline">...</button>*/}
        {/*</div>*/}
      </div>
    </div>
  );
};

export default StrangerInfo;
