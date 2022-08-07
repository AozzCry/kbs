import { useContext } from "react";
import PostsContext, { POST_ACTIONS } from "../store/PostsContext";
import useHttp from "./useHttp";

const useSortPostsByTag = (tagValue) => {
  const postsContext = useContext(PostsContext);
  const { dispatchPosts } = postsContext;

  const { sendRequest: tagsPostsRequest } = useHttp();
  return async () => {
    const posts = await tagsPostsRequest({ url: `/api/posts/tag/${tagValue}` });

    dispatchPosts({ type: POST_ACTIONS.LOAD_POSTS, payload: { posts } });
  };
};

export default useSortPostsByTag;
