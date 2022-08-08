import { useContext } from "react";
import Tag from "../../ui/Tag";
import PostComment from "./PostComment";
import AddComment from "./AddComment";
import API from "../../env";
import UserContext from "../../store/UserContext";
import PostsContext, { POST_ACTIONS } from "../../store/PostsContext";
import useHttp from "../../hooks/useHttp";
import Reaction from "./Reaction";

const Post = ({ post, index, userPost, followed }) => {
  const { token } = useContext(UserContext);
  const postsContext = useContext(PostsContext);
  const { dispatchPosts, setUserPosts } = postsContext;
  const { sendRequest: moreCommentsRequest } = useHttp();
  const { sendRequest: deletePostRequest } = useHttp();
  const { sendRequest: followPostRequest } = useHttp();

  const tags = post.tags.map((tag, index) => <Tag name={tag} key={index} />);

  const comments = post.comments.map((comment) => (
    <PostComment id={comment.id} key={comment.id} comment={comment} />
  ));

  const displayComments =
    comments.length > 0 ? (
      <div>
        <div className="divider p-4 m-0">Comments</div>
        <div className="flex flex-col items-start p-4">{comments}</div>
      </div>
    ) : null;

  const loadMoreCommentsHandler = async () => {
    const { comments } = await moreCommentsRequest({
      url: `/api/posts/${post.id}/comments`,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: { postId: post.id },
    });

    dispatchPosts({
      type: POST_ACTIONS.UPDATE_POST_COMMENT,
      payload: { index, comments },
    });
  };

  const deletePostHandler = async (postId) => {
    await deletePostRequest({
      url: `/api/posts/${postId}/delete`,
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: { postId },
    });

    setUserPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
  };

  const followPostHandler = async (postId) => {
    const posts = await followPostRequest({
      url: `/api/posts/${postId}/observe`,
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    postsContext.setFollowedPosts(posts);
  };

  const unfollowPostHandler = async (postId) => {
    const posts = await followPostRequest({
      url: `/api/posts/${postId}/unobserve`,
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    postsContext.setFollowedPosts(posts);
  };

  return (
    <div className="card card-compact w-full shadow-lg mb-4 bg-base-300">
      <div className="flex justify-between items-center p-4">
        <div className="flex flex-col items-start">
          <div className="dropdown mb-2">
            <label tabIndex="0" className="btn-sm btn-primary rounded">
              •••
            </label>
            <ul
              tabIndex="0"
              className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <p>Report</p>
              </li>
              {userPost && (
                <li>
                  <p onClick={() => deletePostHandler(post.id)}>Delete</p>
                </li>
              )}
              {!followed && (
                <li>
                  <p onClick={() => followPostHandler(post.id)}>Follow</p>
                </li>
              )}
              {followed && (
                <li>
                  <p onClick={() => unfollowPostHandler(post.id)}>Unfollow</p>
                </li>
              )}
            </ul>
          </div>
          <p>{post.user.name}</p>
          <p className="text-sm">{post.created_at.slice(0, 10)}</p>
        </div>
        <div className="avatar w-16">
          <div className=" mask mask-squircle">
            <img src={`${API}${post.user.avatar_url}`} alt="User Avatar" />
          </div>
        </div>
      </div>
      <figure>
        <img
          src="https://placeimg.com/400/225/arch"
          alt="Shoes"
          className="w-full"
        />
      </figure>
      <div className="flex justify-start p-4">{tags}</div>
      <div className="card-body text-left">
        <p className="text-m">{post.body}</p>
      </div>
      <Reaction reactions={post.reactions} id={post.id} />

      {displayComments}
      {token && <AddComment id={post.id} postIndex={index} />}
      {displayComments && (
        <button className="btn btn-primary" onClick={loadMoreCommentsHandler}>
          Load more comments
        </button>
      )}
    </div>
  );
};

export default Post;
