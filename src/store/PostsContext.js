import { createContext, useState, useCallback, useReducer } from "react";

import useHttp from "../hooks/useHttp";

const PostsContext = createContext({
  posts: [],
  dispatchPosts: () => {},
  userPosts: [],
  setUserPosts: () => {},
  getPosts: () => {},
  searchPosts: () => {},
  postsIsLoading: null,
  postsError: null,
  userPostsError: null,
  userPostsLoading: null,
  followedPosts: [],
  setFollowedPosts: () => {},
});

export const POST_ACTIONS = {
  LOAD_POSTS: "load-posts",
  ADD_POST: "add-post",
  DELETE_POST: "delete-post",
  UPDATE_POSTS: "update-posts",
  UPDATE_POST_COMMENT: "update-post-comment",
};

const postsReducer = (posts, action) => {
  switch (action.type) {
    case POST_ACTIONS.LOAD_POSTS:
      return [...action.payload.posts];

    case POST_ACTIONS.ADD_POST:
      return [action.payload.newPost, ...posts];

    case POST_ACTIONS.UPDATE_POSTS:
      const updatedPosts = [...posts];
      updatedPosts.splice(action.payload.postIndex, 1, action.payload.comment);
      return updatedPosts;

    case POST_ACTIONS.UPDATE_POST_COMMENT:
      const newPosts = [...posts];
      newPosts[action.payload.index].comments = action.payload.comments;
      return newPosts;

    default:
      return posts;
  }
};

export const PostsContextProvider = (props) => {
  const [posts, dispatchPosts] = useReducer(postsReducer, []);
  const [userPosts, setUserPosts] = useState([]);
  const [followedPosts, setFollowedPosts] = useState([]);

  const {
    error: postsError,
    isLoading: postsIsLoading,
    sendRequest: postsRequest,
  } = useHttp();

  const {
    error: userPostsError,
    isLoading: userPostsLoading,
    sendRequest: userPostsRequest,
  } = useHttp();

  const getPosts = useCallback(async () => {
    const posts = await postsRequest({ url: "/api/posts" });
    dispatchPosts({ type: POST_ACTIONS.LOAD_POSTS, payload: { posts } });
  }, [postsRequest]);

  const getUserPosts = useCallback(
    async (userId) => {
      const userPosts = await userPostsRequest({
        url: `/api/posts/user/${userId}`,
      });

      setUserPosts(userPosts);
    },
    [userPostsRequest]
  );

  const searchPosts = useCallback(
    async (inputValue) => {
      const posts = await postsRequest({
        url: `/api/posts/tag/${inputValue}`,
      });
      if (posts)
        dispatchPosts({ type: POST_ACTIONS.LOAD_POSTS, payload: { posts } });
    },
    [postsRequest]
  );

  return (
    <PostsContext.Provider
      value={{
        posts,
        userPosts,
        setUserPosts,
        getPosts,
        getUserPosts,
        searchPosts,
        postsError,
        postsIsLoading,
        dispatchPosts,
        userPostsError,
        userPostsLoading,
        followedPosts,
        setFollowedPosts,
      }}
    >
      {props.children}
    </PostsContext.Provider>
  );
};

export default PostsContext;
