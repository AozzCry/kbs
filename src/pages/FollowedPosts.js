import { useContext, useEffect } from "react";
import PostsContext from "../store/PostsContext";
import Post from "../components/posts/Post";
import useHttp from "../hooks/useHttp";
import UserContext from "../store/UserContext";

const FollowedPosts = () => {
  const { token } = useContext(UserContext);
  const { followedPosts } = useContext(PostsContext);
  const { sendRequest: followedPostsRequest } = useHttp();

  useEffect(() => {
    (async () => {
      const xd = await fetch("https://kb.unuel.eu/api/posts/observed", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(xd);
    })();
  }, []);

  const postsToDisplay = followedPosts.map((post, index) => (
    <Post post={post} key={post.id} index={index} followed />
  ));

  return (
    <div className="md:overflow-y-scroll scrollbar-hide md:overflow-hidden">
      {postsToDisplay}
    </div>
  );
};

export default FollowedPosts;
