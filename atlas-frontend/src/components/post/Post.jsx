import "./post.scss";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import Comments from "../comments/Comments";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import EditIcon from "@mui/icons-material/Edit";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DeleteIcon from "@mui/icons-material/Delete";
import ShareModal from "../share/ShareModal";
import EditPostModal from "../editPost/EditPostModal";
import {
  Box,
  ImageList,
  ImageListItem,
  ListItemIcon,
  Menu,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { toast } from "react-toastify";
import {
  deleteSharePostSuccess,
  disLikePostSuccess,
  likePostSuccess,
} from "../../redux/context/postSlice";
import { API_BASE_URL } from "../../constants";
import request from "../../util/fetchUtil";

const Post = ({ post, sharedPost }) => {
  const [sharePostDescription, setSharePostDescription] = useState(
    sharedPost?.description || ""
  );
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const [commentOpen, setCommentOpen] = useState(false);
  const [liked, setLiked] = useState(null);
  const [shareOpen, setShareOpen] = useState(false);
  const [editPostStatus, setEditPostStatus] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  function sharePost(payload) {
    return request({
      url: API_BASE_URL + "/api/v1/shared-posts",
      method: "POST",
      body: JSON.stringify(payload),
    });
  }

  function editPost(payload) {
    return request({
      url: API_BASE_URL + "/api/v1/shared-posts/" + payload.id,
      method: "PUT",
      body: JSON.stringify(payload),
    });
  }

  const handleShare = async (message) => {
    if (sharedPost) {
      try {
        await editPost({
          ...post,
          description: message,
        });
        toast.success("Post edited.");
      } catch (error) {
        toast.error("post error please try again.");
      }
      setSharePostDescription(message);
    } else {
      try {
        await sharePost({
          ...post,
          description: message,
          parentPostId: post.id,
        });
        toast.success("Post shared.");
      } catch (error) {
        toast.error("post error please try again.");
      }
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

  function likePost(payload) {
    return request({
      url: API_BASE_URL + "/posts/" + payload.postId + "/likes",
      method: "POST",
      body: JSON.stringify({ postId: payload.postId, userId: payload.userId }),
    });
  }

  function disLikePost(payload) {
    return request({
      url: API_BASE_URL + "/posts/likes/" + payload.likeId,
      method: "DELETE",
    });
  }

  const handleLike = async () => {
    if (liked) {
      try {
        await disLikePost({
          likeId: liked.id,
        });
        dispatch(disLikePostSuccess({ likeId: liked.id, postId: post.id }));
      } catch (error) {
        toast.error("Like error please try again.");
      }
    } else {
      try {
        const like = await likePost({
          postId: post.id,
          userId: user.id,
        });
        dispatch(likePostSuccess(like));
      } catch (error) {
        toast.error("Like error please try again.");
      }
    }
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
    setShareOpen(true);
  };

  const handleEditPost = () => {
    setEditPostStatus(true);
  };

  const handleEditPostClose = () => {
    setEditPostStatus(false);
  };

  function deleteSharedPost(payload) {
    return request({
      url: API_BASE_URL + "/api/v1/shared-posts/" + payload,
      method: "DELETE",
    });
  }

  function deletePost(id) {
    return request({
      url: API_BASE_URL + "/api/v1/posts/" + id,
      method: "DELETE",
    });
  }

  const handleDelete = async () => {
    try {
      if (sharedPost) {
        await deleteSharedPost(sharedPost.id);
        dispatch(deleteSharePostSuccess(sharedPost.id));
      } else {
        await deletePost(post.id);
        dispatch(deleteSharePostSuccess(post.id));
      }
      toast.success("Share post deleted.");
    } catch (error) {
      toast.error("Like error please try again.");
    }
  };

  return (
    <div className="post">
      <div className="container">
        <div className="user">
          <div className="userInfo">
            <div className="details">
              <span className="name">{sharePostDescription}</span>
            </div>
          </div>
          <div className="actions">
            <MoreVertIcon onClick={handleClick} />
            <Menu
              anchorEl={anchorEl}
              id="account-menu"
              open={open}
              onClose={handleClose}
              onClick={handleClose}
              PaperProps={{
                elevation: 0,
                sx: {
                  overflow: "visible",
                  filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                  mt: 1.5,
                  "& .MuiAvatar-root": {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },
                  "&::before": {
                    content: '""',
                    display: "block",
                    position: "absolute",
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: "background.paper",
                    transform: "translateY(-50%) rotate(45deg)",
                    zIndex: 0,
                  },
                },
              }}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
              {sharedPost && (
                <MenuItem onClick={handleEdit}>
                  <ListItemIcon>
                    <EditIcon fontSize="small" />
                  </ListItemIcon>
                  Edit Post
                </MenuItem>
              )}
              {!sharedPost && (
                <MenuItem onClick={handleEditPost}>
                  <ListItemIcon>
                    <EditIcon fontSize="small" />
                  </ListItemIcon>
                  Edit Post
                </MenuItem>
              )}
              <MenuItem onClick={handleDelete}>
                <ListItemIcon>
                  <DeleteIcon fontSize="small" />
                </ListItemIcon>
                Delete Post
              </MenuItem>
            </Menu>
          </div>
        </div>
        <div className="content">
          <Typography sx={{ minWidth: 100 }}>{post.description}</Typography>
          <hr />

          <Box
            component="form"
            sx={{
              "& .MuiTextField-root": { m: 1, width: "50ch" },
            }}
            noValidate
            autoComplete="off"
          >
            {post.extraFields?.length > 0 &&
              post.extraFields.map((item) => (
                <div>
                  <TextField
                    label={
                      post.postType === "MEAL" ? "Food Type" : "Workout Type"
                    }
                    id="outlined-start-adornment"
                    sx={{ m: 1, width: "46%" }}
                    disabled
                    value={item.key}
                  />
                  <TextField
                    label={
                      post.postType === "MEAL"
                        ? "Food Portion"
                        : "Current Status"
                    }
                    id="outlined-start-adornment"
                    sx={{ m: 1, width: "46%" }}
                    disabled
                    value={item.value}
                  />
                </div>
                // </Box>
              ))}
          </Box>
          {/* <img src={post.mediaUrl} alt="" /> */}
          {post.mediaUrl.length > 0 && (
            <ImageList
              sx={{ width: "100%" }}
              variant="quilted"
              cols={post?.mediaUrl.length > 3 ? 3 : post?.mediaUrl.length}
              rowHeight={500}
            >
              {post.mediaUrl.map((item, index) => {
                const isImage = item.startsWith("data:image");
                const isVideo = item.startsWith("data:video");
                return (
                  <ImageListItem key={`create-post-image-${index}`}>
                    {isImage ? (
                      <img src={item} loading="lazy" />
                    ) : (
                      <video
                        controls
                        autoPlay
                        muted
                        className="w-full h-auto" // Adjusted for responsive width and auto height
                        loop
                      >
                        <source src={item} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    )}
                  </ImageListItem>
                );
              })}
            </ImageList>
          )}
        </div>
        <div className="info">
          <div className="item" onClick={handleLike}>
            {liked ? <FavoriteOutlinedIcon /> : <FavoriteBorderOutlinedIcon />}
            {post?.likes?.length} Likes
          </div>
          <div className="item" onClick={() => setCommentOpen(!commentOpen)}>
            <TextsmsOutlinedIcon />
            {post?.comments?.length} Comments
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
          {editPostStatus && (
            <EditPostModal
              open={handleEditPost}
              onClose={handleEditPostClose}
              postData={post}
            />
          )}
        </div>
        {commentOpen && <Comments comments={post?.comments} postId={post.id} />}
      </div>
    </div>
  );
};

export default Post;
