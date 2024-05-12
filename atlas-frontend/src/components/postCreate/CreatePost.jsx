import "./share.scss";
import Image from "../../assets/img.png";
import { useDispatch, useSelector } from "react-redux";
import { useReducer } from "react";
import { postCreationSuccess } from "../../redux/context/postSlice";
import { toast } from "react-toastify";
import request from "../../util/fetchUtil";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { API_BASE_URL } from "../../constants";
import { ImageList, ImageListItem, TextField } from "@mui/material";

const PostCreate = ({ type }) => {
  const user = useSelector((state) => state.auth.user);

  const [state, setState] = useReducer(
    (prevState, newState) => {
      return { ...prevState, ...newState };
    },
    {
      key: "",
      value: "",
    }
  );

  const initialState = {
    description: "",
    mediaUrl: [],
    userId: user?.id,
    extraFields: [],
    postType: type,
  };

  const [post, setPost] = useReducer((prevState, newState) => {
    return { ...prevState, ...newState };
  }, initialState);

  const dispatch = useDispatch();

  const handleInputChange = (event) => {
    const target = event.target;
    const inputName = target.name;
    const inputValue = target.value;

    setState({
      [inputName]: inputValue,
    });
  };

  const handleExtraFields = () => {
    if (!state.key || !state.value) {
      toast.error("Mandatory params missing.");
      return;
    }
    setState({
      key: "",
      value: "",
    });
    setPost({
      post,
      extraFields: [...post.extraFields, state],
    });
  };

  const handleRemoveFields = (index) => {
    post.extraFields.splice(index, 1);
    setPost({
      post,
      extraFields: [...post.extraFields],
    });
  };

  const handleDescription = (event) => {
    setPost({ description: event.target.value });
  };

  function createPost(post) {
    return request({
      url: API_BASE_URL + "/api/v1/posts/",
      method: "POST",
      body: JSON.stringify(post),
    });
  }

  const submitPost = async () => {
    if (!post.description) {
      toast.error("Post description is mandatory");
      return;
    }
    if (type === "GENERAL" && post.mediaUrl.length === 0) {
      toast.error("Please attach attach image");
      return;
    }

    try {
      const response = await createPost(post);
      if (response) {
        toast.success("Post successfully created!");
        setPost({ ...initialState });
        dispatch(postCreationSuccess(response));
      }
    } catch (error) {
      toast.error("Oops! Something went wrong.");
    }
  };

  const handleImageChange = (event) => {
    if (!event.target.files) return;

    const files = Array.from(event.target.files);

    if (files.length > 3) {
      toast.error("Please select up to 3 images");
      return;
    }

    const imagePromises = files.map((file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (event) => resolve(event.target.result);
        reader.onerror = (error) => reject(error);
        reader.readAsDataURL(file);
      });
    });

    Promise.all(imagePromises)
      .then((base64Images) => {
        setPost({ mediaUrl: base64Images });
      })
      .catch((error) => {
        toast("Error converting images to base64:", { type: "error" });
      });
  };

  return (
    <div className="share">
      <div className="container">
        <div className="top">
          <img
            src={
              user?.imageUrl ||
              "https://cdn-icons-png.flaticon.com/512/149/149071.png"
            }
            alt=""
          />
          <input
            type="text"
            onChange={handleDescription}
            value={post.description}
            placeholder={`What's on your mind ${user?.name}?`}
          />
        </div>
        <hr />
        {type !== "GENERAL" && (
          <>
            {post.extraFields.length > 0 &&
              post.extraFields.map((item, index) => (
                // <Box sx={{ display: "flex", flexWrap: "wrap" }}>
                <div>
                  <TextField
                    label={type === "MEAL" ? "Food Type" : "Workout Type"}
                    id="outlined-start-adornment"
                    sx={{ m: 1, width: "40%" }}
                    disabled
                    value={item.key}
                  />
                  <TextField
                    label={type === "MEAL" ? "Food Portion" : "Current Status"}
                    id="outlined-start-adornment"
                    sx={{ m: 1, width: "40%" }}
                    disabled
                    value={item.value}
                  />
                  <button
                    onClick={handleRemoveFields}
                    style={{
                      marginTop: "16px",
                      backgroundColor: "rgb(255 102 102)",
                      border: "none",
                      padding: "5px",
                      color: "white",
                      borderRadius: "3px",
                    }}
                  >
                    <CloseIcon />
                  </button>
                </div>
                // </Box>
              ))}
            <TextField
              label={type === "MEAL" ? "Food Type" : "Workout Type"}
              id="outlined-start-adornment"
              sx={{ m: 1, width: "40%" }}
              name="key"
              onChange={handleInputChange}
              value={state.key}
            />
            <TextField
              label={type === "MEAL" ? "Food Portion" : "Current Status"}
              id="outlined-start-adornment"
              sx={{ m: 1, width: "40%" }}
              name="value"
              onChange={handleInputChange}
              value={state.value}
            />
            <button
              onClick={handleExtraFields}
              style={{
                marginTop: "16px",
                backgroundColor: "rgb(102 114 255)",
                border: "none",
                padding: "5px",
                color: "white",
                borderRadius: "3px",
              }}
            >
              <CheckIcon />
            </button>
            <hr />
          </>
        )}
        {type === "GENERAL" && (
          <div>
            {post.mediaUrl.length > 0 && (
              <ImageList
                sx={{ width: "100%" }}
                variant="quilted"
                cols={3}
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

            <div className="bottom">
              <div className="left">
                <input
                  type="file"
                  id="file"
                  style={{ display: "none" }}
                  accept="image/*,video/*"
                  multiple
                  onChange={handleImageChange}
                />
                <label htmlFor="file">
                  <div className="item">
                    <img src={Image} alt="" />
                    <span>Add Attachments</span>
                  </div>
                </label>
              </div>
            </div>
          </div>
        )}
        <div className="bottom">
          <div className="left"></div>
          <div className="right" onClick={submitPost}>
            <button>Share</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCreate;
