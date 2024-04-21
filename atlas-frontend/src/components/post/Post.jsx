import "./post.scss";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import Comments from "../comments/Comments";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  deleteSharePost,
  disLikePost,
  editSharePost,
  likePost,
  sharePost,
} from "../../redux/context/postSlice";
import ShareModal from "../share/ShareModal";

const Post = ({ post, sharedPost }) => {
  const [sharePostDescription, setSharePostDescription] = useState(
    sharedPost?.description || ""
  );
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const [commentOpen, setCommentOpen] = useState(false);
  const [liked, setLiked] = useState(null);
  const [shareOpen, setShareOpen] = useState(false);

  const handleShare = (message) => {
    if (sharedPost) {
      dispatch(
        editSharePost({
          ...sharedPost,
          description: message,
        })
      );
      setSharePostDescription(message);
    } else {
      dispatch(
        sharePost({
          ...post,
          description: message,
          parentPostId: post.id,
        })
      );
    }
  };

  useEffect(() => {
    if (user) {
      if (post.likes) {
        const likeData = post.likes.find((like) => like.userId === user.id);
        if (likeData) {
          setLiked(likeData);
        } else {
          setLiked(null);
        }
      }
    }
  }, [user, post]);

  const handleLike = () => {
    if (liked) {
      dispatch(
        disLikePost({
          likeId: liked.id,
        })
      );
    } else {
      dispatch(
        likePost({
          postId: post.id,
          userId: user.id,
        })
      );
    }
  };

  const handleEdit = () => {
    setShareOpen(true);
  };

  const handleDelete = () => {
    dispatch(deleteSharePost(sharedPost.id));
  };

  return (
    <div className="post">
      <div className="container">
        {sharedPost && (
          <div className="user">
            <div className="userInfo">
              <div className="details">
                <span className="name">{sharePostDescription}</span>
              </div>
            </div>
            <div className="actions">
              <button onClick={handleEdit}>
                <EditIcon />
              </button>
              <button onClick={handleDelete}>
                <DeleteIcon />
              </button>
            </div>
          </div>
        )}
        <div className="content">
          <p>{post.description}</p>
          <img src={post.mediaUrl} alt="" />
        </div>
        <div className="info">
          <div className="item" onClick={handleLike}>
            {liked ? <FavoriteOutlinedIcon /> : <FavoriteBorderOutlinedIcon />}
            {post?.likes.length} Likes
          </div>
          <div className="item" onClick={() => setCommentOpen(!commentOpen)}>
            <TextsmsOutlinedIcon />
            {post?.comments.length} Comments
          </div>
          <div className="item" onClick={() => setShareOpen(true)}>
            <ShareOutlinedIcon />
            Share
          </div>
          {shareOpen && (
            <ShareModal
              open={shareOpen}
              onClose={() => setShareOpen(false)}
              text={sharedPost?.description}
              onShare={handleShare}
            />
          )}
        </div>
        {commentOpen && <Comments comments={post?.comments} postId={post.id} />}
      </div>
    </div>
  );
};

export default Post;
