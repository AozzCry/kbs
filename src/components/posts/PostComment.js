import API from "../../env";

const PostComment = ({ comment }) => {
  const { name, avatar_url, created_at } = comment.user;

  return (
    <div id={comment.id} className="p-4 text-left flex w-full gap-4">
      <div className="avatar shrink-0">
        <div className="max-w-8 h-8 sm:w-16 sm:h-16 mask mask-squircle">
          <img
            src={`${API}${avatar_url}`}
            alt="User Avatar"
            className="object-cover"
          />
        </div>
      </div>
      <div className="grow">
        <div className="flex flex-col sm:flex-row justify-between mb-2">
          <p>{name}</p>
          <p>{created_at.slice(0, 10)}</p>
        </div>
        <p className="text-sm">{comment.body}</p>
      </div>
    </div>
  );
};

export default PostComment;
