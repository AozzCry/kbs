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


  const [userFriends] = [friendsCtx.friends];

  const { name, email, id } = userCtx.userData.user;
  const submitHandler = async (e) => {
    e.preventDefault();
    if (inputValue !== "") {
      await sendMessage(name, inputValue, id);
      setInputValue("");
    }
  };

  useEffect(() => {
    if (isLoaded) {
      messagesBoxRef.current.lastChild.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [messages]);

  const friendsToDisplay = userFriends.map((friend, index) => (
    <Friend
      key={index}
      friend={friend}
      userId={id}
      userEmail={email}
      setConnection={setConnection}
    />
  ));
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
