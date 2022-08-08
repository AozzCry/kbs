import React, { useContext, useEffect } from "react";
import useChat from "../../hooks/useChat";
import UserContext from "../../store/UserContext";
import FriendsContext from "../../store/FriendsContext";

import Friend from "./Friend";

const Friends = () => {
  const [setConnection] = useChat();

  const userCtx = useContext(UserContext);
  const friendsCtx = useContext(FriendsContext);
  const { getFriends } = friendsCtx;
  const { token } = userCtx.userData;

  useEffect(() => {
    getFriends(token);
  }, [token, getFriends]);

  const [userFriends] = [friendsCtx.friends];

  const { email, id } = userCtx.userData.user;

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
