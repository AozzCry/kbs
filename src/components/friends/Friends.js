import React, { useState, useContext, useRef, useEffect } from "react";
import useChat from "../../hooks/useChat";
import UserContext from "../../store/UserContext";
import FriendsContext from "../../store/FriendsContext";

import Friend from "./Friend";

const Friends = () => {
  const [setConnection] = useChat();

  const userCtx = useContext(UserContext);
  const friendsCtx = useContext(FriendsContext);
  const { token } = userCtx.userData;

  useEffect(() => {
    friendsCtx.getFriends(token);
  }, [token]);

  const [userFriends] = [friendsCtx.friends];

  const { email, id } = userCtx.userData.user;

  console.log(userFriends);
  return (
    <div>
      <div className="collapse-title text-xl font-medium p-0 mb-2">
        {userFriends &&
          userFriends.map((friend, index) => (
            <Friend
              key={index}
              friend={friend}
              userId={id}
              userEmail={email}
              setConnection={setConnection}
            />
          ))}
      </div>
    </div>
  );
};

export default Friends;
