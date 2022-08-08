import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faThumbsUp,
  faThumbsDown,
  faHeart,
  faFaceGrinSquintTears,
  faFaceAngry,
} from "@fortawesome/free-solid-svg-icons";

import "../../App.css";

const Reaction = ({ reactions }) => {
  return (
    <div className="flex gap-4 items-center justify-center">
      <div
        className="xd p-2 bg-base-100 flex items-center justify-center gap-2 rounded-full relative"
        data-reactions="10"
      >
        <FontAwesomeIcon icon={faThumbsUp} />
      </div>
      <div
        className="xd p-2 bg-base-100 flex items-center justify-center gap-2 rounded-full relative"
        data-reactions={reactions[1]}
      >
        <FontAwesomeIcon icon={faThumbsDown} />
      </div>
      <div
        className="xd p-2 bg-base-100 flex items-center justify-center gap-2 rounded-full relative"
        data-reactions={reactions[2]}
      >
        <FontAwesomeIcon icon={faHeart} />
      </div>
      <div
        className="xd p-2 bg-base-100 flex items-center justify-center gap-2 rounded-full relative"
        data-reactions={reactions[3]}
      >
        <FontAwesomeIcon icon={faFaceGrinSquintTears} />
      </div>
      <div
        className="xd p-2 bg-base-100 flex items-center justify-center gap-2 rounded-full relative"
        data-reactions={reactions[4]}
      >
        <FontAwesomeIcon icon={faFaceAngry} />
      </div>
    </div>
  );
};

export default Reaction;
