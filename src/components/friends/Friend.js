import API from "../../env";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import FriendsContext from "../../store/FriendsContext";

const Friend = ({ friend, userId, userEmail, setConnection }) => {
  const friendsCtx = useContext(FriendsContext);

  let connectionString;
  if (friend.email && userEmail) {
    if (userId > friend.id) {
      connectionString = `${friend.email
        .replaceAll(".", "")
        .replaceAll("@", "")}${userEmail
        .replaceAll(".", "")
        .replaceAll("@", "")}`;
    } else {
      connectionString = `${userEmail
        .replaceAll(".", "")
        .replaceAll("@", "")}${friend.email
        .replaceAll(".", "")
        .replaceAll("@", "")}`;
    }
  }
  return (
    <div>
      <Link
        to="./messenger"
        state={{ friend: friend }}
        onClick={() => friendsCtx.setConnection(connectionString)}
        className="flex items-center justify-center space-x-3 bg-base-300 p-2 rounded-box shadow-lg"
      >
        <div className="flex avatar">
          <div className="mask mask-squircle w-12 h-12">
            <img src={`${API}${friend.avatar_url}`} alt="User Avatar" />
          </div>
        </div>
        <div className="font-bold lg:grid justify-items-center">
          {friend.name}
        </div>
      </Link>
    </div>
  );
};

export default Friend;
