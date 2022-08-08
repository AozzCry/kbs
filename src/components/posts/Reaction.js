import React, { useContext } from "react";
import UserContext from "../../store/UserContext";
import API from "../../env";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faThumbsUp,
  faThumbsDown,
  faHeart,
  faFaceGrinSquintTears,
  faFaceAngry,
} from "@fortawesome/free-solid-svg-icons";

import "../../App.css";

const Reaction = ({ reactions, id }) => {
  const { token } = useContext(UserContext);

  const reactOnPost = async (reactionString) => {
    await fetch(`${API}/api/posts/${id}/react`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        reaction: reactionString,
      }),
    });
  };

  return (
    <div className="flex gap-4 items-center justify-center">
      <div
        onClick={() => reactOnPost("like")}
        className="xd p-2 bg-base-100 flex items-center justify-center gap-2 rounded-full relative"
        data-reactions={reactions["like"] ? reactions["like"] : "0"}
      >
        <FontAwesomeIcon icon={faThumbsUp} />
      </div>
      <div
        onClick={() => reactOnPost("dislike")}
        className="xd p-2 bg-base-100 flex items-center justify-center gap-2 rounded-full relative"
        data-reactions={reactions["dislike"] ? reactions["dislike"] : "0"}
      >
        <FontAwesomeIcon icon={faThumbsDown} />
      </div>
      <div
        onClick={() => reactOnPost("love")}
        className="xd p-2 bg-base-100 flex items-center justify-center gap-2 rounded-full relative"
        data-reactions={reactions["love"] ? reactions["love"] : "0"}
      >
        <FontAwesomeIcon icon={faHeart} />
      </div>
      <div
        onClick={() => reactOnPost("haha")}
        className="xd p-2 bg-base-100 flex items-center justify-center gap-2 rounded-full relative"
        data-reactions={reactions["haha"] ? reactions["haha"] : "0"}
      >
        <FontAwesomeIcon icon={faFaceGrinSquintTears} />
      </div>
      <div
        onClick={() => reactOnPost("angry")}
        className="xd p-2 bg-base-100 flex items-center justify-center gap-2 rounded-full relative"
        data-reactions={reactions["angry"] ? reactions["angry"] : "0"}
      >
        <FontAwesomeIcon icon={faFaceAngry} />
      </div>
    </div>
  );
};

export default Reaction;
