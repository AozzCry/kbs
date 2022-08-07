import { useState, useContext } from "react";
import UserContext from "../../store/UserContext";
import PostsContext, { POST_ACTIONS } from "../../store/PostsContext";
import useHttp from "../../hooks/useHttp";

const AddComment = ({ id, postIndex }) => {
  const { token } = useContext(UserContext);
  const { dispatchPosts } = useContext(PostsContext);

  const [commentText, setCommentText] = useState("");
  const { sendRequest: addCommentRequest } = useHttp();

  const addCommentHandler = async (e) => {
    e.preventDefault();

    const comment = await addCommentRequest({
      url: `/api/posts/${id}/comments/add`,
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: { postId: id, body: commentText },
    });

    dispatchPosts({
      type: POST_ACTIONS.UPDATE_POSTS,
      payload: { postIndex, comment },
    });

    setCommentText("");
  };

  return (
    <div className="form-control p-4">
      <form onSubmit={addCommentHandler}>
        <div className="input-group">
          <input
            type="text"
            placeholder="Add comment…"
            className="input input-bordered w-full"
            onChange={(e) => setCommentText(e.target.value)}
            value={commentText}
          />
          <button type="submit" className="btn btn-square">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="w-4 h-4 mr-2 stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              ></path>
            </svg>
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddComment;
