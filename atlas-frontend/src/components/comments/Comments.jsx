import { useDispatch, useSelector } from "react-redux";
import "./comments.scss";
import { useState } from "react";
import { addComment } from "../../redux/context/postSlice";
import Comment from "../comment/Comment";

const Comments = ({ comments, postId }) => {
  const [comment, setComment] = useState("");
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const handleAddComment = () => {
    dispatch(
      addComment({
        postId: postId,
        text: comment,
        userId: user.id,
      })
    );
    setComment("");
  };

  const handleComment = (event) => {
    setComment(event.target.value);
  };

  return (
    <div className="comments">
      <div className="write">
        <img
          src={
            user?.imageUrl ||
            "https://cdn-icons-png.flaticon.com/512/149/149071.png"
          }
          alt=""
        />
        <input
          type="text"
          placeholder="write a comment"
          onChange={handleComment}
          value={comment}
        />
        <button onClick={handleAddComment}>Send</button>
      </div>
      {comments.map((comment) => (
        <Comment comment={comment} postId={postId} key={comment.id} />
      ))}
    </div>
  );
};

export default Comments;
