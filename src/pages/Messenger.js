import React, { useState, useContext, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import useChat from "../hooks/useChat";
import UserContext from "../store/UserContext";
import FriendsContext from "../store/FriendsContext";
import API from "../env";
import Tag from "../ui/Tag";

const Friends = () => {
  const location = useLocation();
  const { friend } = location.state;
  const [inputValue, setInputValue] = useState("");
  const [messages, sendMessage, getMessages] = useChat();
  const [isLoaded, setIsLoaded] = useState(false);

  const userCtx = useContext(UserContext);
  const friendsCtx = useContext(FriendsContext);
  const messagesBoxRef = useRef(null);
  const { token } = userCtx.userData;

  useEffect(() => {
    friendsCtx.getFriends(token);
  }, [token]);

  useEffect(() => {
    const interval = setInterval(() => {
      getMessages();
    }, 2000);
    return () => clearInterval(interval);
  }, [friendsCtx.connection]);

  useEffect(() => {
    getMessages();
  }, [friendsCtx.connection]);

  useEffect(() => {
    setIsLoaded(true);
  });

  const { name, id } = userCtx.userData.user;
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

  const deleteFriend = () => {
    fetch(`${API}/api/friends/${friend.id}/delete`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${userCtx.userData.token}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
  };

  return (
    <div>
      <div className="card-body collapse-title items-center text-center p-4">
        <div className="avatar online">
          <div className="w-24 rounded-full">
            <img src={`${API}${friend.avatar_url}`} alt="User avatar" />
          </div>
        </div>
        <h2 className="card-title">{friend.name ? friend.name : "Username"}</h2>
        <div className="collapse collapse-arrow">
          <input type="checkbox" />
          <button className="btn btn-dark collapse-title  text-xl font-medium p-0 mb-2">
            More
          </button>
          <div className="collapse-content">
            <p>{friend.email}</p>
            <p>{friend.description ? friend.description : "Description"}</p>

            <div className="flex justify-center w-full gap-4">
              {friend.tags
                ? friend.tags.map((tag, index) => (
                    <Tag name={tag} key={index} />
                  ))
                : null}
            </div>
            <button className="btn btn-dark" onClick={deleteFriend}>
              Unfriend
            </button>
          </div>
        </div>
      </div>
      <div>
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
    </div>
  );
};

export default Friends;
