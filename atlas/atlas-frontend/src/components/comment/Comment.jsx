import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import "./comment.scss";
import { useState } from "react";
import request from "../../util/fetchUtil";
import { API_BASE_URL } from "../../constants";
import { deleteCommentSuccess } from "../../redux/context/postSlice";
import { toast } from "react-toastify";

const Comment = ({ comment, postId }) => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const [editedText, setEditedText] = useState(comment.text);
  const [isEditing, setIsEditing] = useState(false);

  function deleteComment(payload) {
    return request({
      url:
        API_BASE_URL +
        "/api/comments/" +
        payload.commentId +
        "/" +
        payload.userId,
      method: "DELETE",
    });
  }

  function editComment(payload) {
    return request({
      url: API_BASE_URL + "/api/comments/" + payload.id,
      method: "PUT",
      body: JSON.stringify(payload),
    });
  }

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedText(comment.text);
  };

  const handleSaveEdit = async () => {
    try {
      await editComment({
        id: comment.id,
        postId: postId,
        text: editedText,
        userId: user.id,
      });
      toast.success("Comment updated!.");
      setIsEditing(false);
    } catch (error) {
      toast.error("Comment error please try again.");
    }
  };

  const handleChange = (e) => {
    setEditedText(e.target.value);
  };

  const handleDelete = async () => {
    try {
      await deleteComment({
        commentId: comment.id,
        userId: user.id,
      });
      toast.success("Comment deleted!.");
      dispatch(deleteCommentSuccess({ commentId: comment.id, postId }));
    } catch (error) {
      toast.error("Comment error please try again.");
    }
  };

  return (
    <div className="comment" key={comment.id}>
      <img
        src={
          comment?.commentedUser?.imageUrl ||
          "https://cdn-icons-png.flaticon.com/512/149/149071.png"
        }
        alt=""
      />
      <div className="info">
        <span>{comment?.commentedUser?.name}</span>
        {isEditing ? (
          <input
            type="text"
            value={editedText}
            onChange={handleChange}
            autoFocus
          />
        ) : (
          <p>{editedText}</p>
        )}
      </div>
      {user.id === comment?.commentedUser?.id && (
        <div className="actions">
          {isEditing ? (
            <>
              <button onClick={handleSaveEdit}>
                <CheckIcon />
              </button>
              <button onClick={handleCancelEdit}>
                <CloseIcon />
              </button>
            </>
          ) : (
            <>
              <button onClick={handleEdit}>
                <EditIcon />
              </button>
              <button onClick={handleDelete}>
                <DeleteIcon />
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Comment;
