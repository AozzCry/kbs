import React, { useState, useContext, useRef, useEffect } from "react";
import useChat from "../../hooks/useChat";
import UserContext from "../../store/UserContext";
import FriendsContext from "../../store/FriendsContext";

import Friend from "./Friend";

const Friends = () => {
  const [inputValue, setInputValue] = useState("");
  const [messages, sendMessage, getMessages, setConnection] = useChat();
  const [isLoaded, setIsLoaded] = useState(false);

  const userCtx = useContext(UserContext);
  const friendsCtx = useContext(FriendsContext);
  const messagesBoxRef = useRef(null);
  const { token } = userCtx.userData;

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     const { getFriends } = friendsCtx;
  //     getFriends(token);
  //     getMessages();
  //   }, 1000);
  //   return () => clearInterval(interval);
  // }, [token]);

  useEffect(() => {
    setIsLoaded(true);
  });

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
        {friendsToDisplay}
      </div>
      <div className="collapse" onClick={getMessages}>
        <input type="checkbox" />
        <button className="btn btn-dark collapse-title text-xl font-medium p-0 mb-2">
          wiadomosci
        </button>
        <div className="collapse-content">
          <form onSubmit={submitHandler} className="bg-base-200">
            <h2 className="font-bold text-center">Wiadomości</h2>
            <div
              className="max-h-52 scrollbar-hide overflow-y-scroll"
              ref={messagesBoxRef}
            >
              {messages.map((mesTab, index) => {
                if (mesTab[1].id === id) {
                  return (
                    <p key={index} className="p-1">
                      {mesTab[1].message}
                    </p>
                  );
                } else {
                  return (
                    <p key={index} className="p-1 text-right">
                      {mesTab[1].message}
                    </p>
                  );
                }
              })}
            </div>
            <div className="divider divider-vertical p-2"></div>
            <input
              className="input input-primary w-full"
              placeholder="Send message..."
              type="text"
              onChange={(e) => setInputValue(e.target.value)}
              value={inputValue}
            />
          </form>
        </div>

        {/*<button onClick={getMessages} className="btn">*/}
        {/*  Load messages*/}
        {/*</button>*/}

        {/*<div>Wiadomości</div>*/}
        {/*{messages.map((mesTab, index) => (*/}
        {/*  <p key={index}>{mesTab[1].message}</p>*/}
        {/*))}*/}
      </div>
    </div>
  );
};

export default Friends;
