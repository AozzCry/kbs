import { useContext } from "react";

import Post from "./Post";
import PostsContext from "../../store/PostsContext";

const PostLists = () => {
  const postsContext = useContext(PostsContext);
  const { posts } = postsContext;

  const postsToDisplay = posts.map((post, index) => (
    <Post post={post} key={post.id} index={index} />
  ));

  return (
    <div className="md:overflow-y-scroll scrollbar-hide md:overflow-hidden">
      {postsToDisplay}
    </div>
  );
};

export default PostLists;
