import { useState, useContext } from "react";
import FriendsContext from "../store/FriendsContext";

const useChat = () => {
  const [messages, setMessages] = useState([]);
  const friendsCtx = useContext(FriendsContext);
  const { connection } = friendsCtx;

  const getMessages = async () => {
    const response = await fetch(
      `https://kbchat-308b7-default-rtdb.europe-west1.firebasedatabase.app/${connection}.json`
    );
    const data = await response.json();
    if (messages !== Object.entries(data)) {
      setMessages(Object.entries(data));
    }
  };

  const sendMessage = async (user, message, id) => {
    try {
      await fetch(
        `https://kbchat-308b7-default-rtdb.europe-west1.firebasedatabase.app/${connection}.json`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            message,
            user,
            id,
          }),
        }
      );
      await getMessages();
    } catch (e) {
      console.error(e.message);
    }
  };

  return [messages, sendMessage, getMessages];
};

export default useChat;
