import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import "./comment.scss";
import { useState } from "react";
import { deleteComment, editComment } from "../../redux/context/postSlice";

const Comment = ({ comment }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const [editedText, setEditedText] = useState(comment.text);
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedText(comment.text);
  };

  const handleSaveEdit = () => {
    dispatch(
      editComment({
        ...comment,
        text: editedText,
      })
    );
    setIsEditing(false);
  };

  const handleChange = (e) => {
    setEditedText(e.target.value);
  };

  const handleDelete = () => {
    dispatch(
      deleteComment({
        commentId: comment.id,
        userId: user.id,
      })
    );
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
      {user.id === comment.commentedUser.id && (
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
