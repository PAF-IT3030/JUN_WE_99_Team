import { useDispatch, useSelector } from "react-redux";
import "./comments.scss";
import { useState } from "react";
import Comment from "../comment/Comment";
import request from "../../util/fetchUtil";
import { toast } from "react-toastify";
import { API_BASE_URL } from "../../constants";
import { addCommentSuccess } from "../../redux/context/postSlice";

const Comments = ({ comments, postId }) => {
  const [comment, setComment] = useState("");
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  function addComments(payload) {
    return request({
      url: API_BASE_URL + "/api/comments/",
      method: "POST",
      body: JSON.stringify(payload),
    });
  }

  const handleAddComment = async () => {
    try {
      const createdComment = await addComments({
        postId: postId,
        text: comment,
        userId: user.id,
      });
      dispatch(addCommentSuccess(createdComment));
      setComment("");
    } catch (error) {
      toast.error("Comment error please try again.");
    }
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
