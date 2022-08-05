import { useContext, useEffect } from "react";
import PostsList from "./PostsList";
import AddPost from "./AddPost";
import UserContext from "../../store/UserContext";

import PostsContext from "../../store/PostsContext";

import { CirclesWithBar } from "react-loader-spinner";

const PostsContainer = () => {
  const userCtx = useContext(UserContext);
  const { token } = userCtx.userData;

  const postsCtx = useContext(PostsContext);
  const { getPosts, postsIsLoading, postsError } = postsCtx;

  useEffect(() => {
    getPosts();
  }, [getPosts]);

  if (postsError) return <p>Error</p>;

  if (postsIsLoading) return <CirclesWithBar color="#5014B8" />;

  return (
    <>
      {token && <AddPost />}
      <PostsList />
    </>
  );
};

export default PostsContainer;
