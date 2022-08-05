import { useContext, useEffect } from "react";

import userContext from "../../store/UserContext";
import noPostsImg from "../../assets/imgs/noPosts.png";
import Post from "./Post";
import PostsContext from "../../store/PostsContext";

const UserPosts = () => {
  const userCtx = useContext(userContext);
  const { token } = userCtx;
  const { id } = userCtx.userData.user;

  const postsCtx = useContext(PostsContext);
  const { getUserPosts, userPosts } = postsCtx;

  let classes = token
    ? "md:overflow-y-scroll scrollbar-hide md:overflow-hidden"
    : "md:overflow-y-scroll scrollbar-hide flex items-center md:overflow-hidden";

  const loadedPosts = !token ? (
    <div className="w-1/2 space-y-4 mx-auto">
      <h1 className="text-2xl">U had to login first to see Your posts!</h1>
      <img src={noPostsImg} alt="" />
    </div>
  ) : (
    userPosts.map((post) => <Post post={post} key={post.id} userPost />)
  );

  useEffect(() => {
    if (token) getUserPosts(id);
  }, [id, token, getUserPosts]);

  return <div className={classes}>{loadedPosts}</div>;
};

export default UserPosts;
