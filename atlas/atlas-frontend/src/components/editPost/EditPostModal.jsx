import { useReducer, useState } from "react";
import Modal from "@mui/material/Modal";
import "./editpostModal.scss";
import Button from "@mui/material/Button";
import { Box, DialogActions, Typography, TextField } from "@mui/material";
import request from "../../util/fetchUtil";
import { API_BASE_URL } from "../../constants";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { EditSharePostSuccess } from "../../redux/context/postSlice";

const EditPostModal = ({ open, onClose, postData }) => {
  const dispatch = useDispatch();
  const [post, setPost] = useReducer((prevState, newState) => {
    return { ...prevState, ...newState };
  }, postData);

  const [message, setMessage] = useState(postData.description);
  const [state, setState] = useReducer(
    (prevState, newState) => {
      return { ...prevState, ...newState };
    },
    {
      key: "",
      value: "",
    }
  );

  const handleInputChange = (event) => {
    const target = event.target;
    const inputName = target.name;
    const inputValue = target.value;

    setState({
      [inputName]: inputValue,
    });
  };

  function updatePost(id, post) {
    return request({
      url: API_BASE_URL + "/api/v1/posts/" + id,
      method: "PUT",
      body: JSON.stringify(post),
    });
  }

  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  const handleUpdate = async () => {
    try {
      const response = await updatePost(post.id, {
        ...post,
        description: message,
      });

      if (response) {
        toast("Post updated successfully", { type: "success" });
        onClose();
        dispatch(EditSharePostSuccess(response));
        setMessage("");
      }
    } catch (error) {
        console.log(error)
      toast("Oops, Something went wrong", { type: "error" });
    }
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

  return (
    <Modal open={open} onClose={onClose}>
      <div className="share-modal">
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Edit post here.
        </Typography>
        <TextField
          id="share-message"
          label="Add description here."
          variant="outlined"
          value={message}
          onChange={handleChange}
          fullWidth
          multiline
          rows={4}
        />
        {post.postType && post.postType !== "GENERAL" && (
          <>
            {post.extraFields?.length > 0 &&
              post.extraFields.map((item) => (
                <Box sx={{ display: "flex", flexWrap: "wrap" }}>
                  <div>
                    <TextField
                      label={
                        post?.type === "MEAL" ? "Food Type" : "Workout Type"
                      }
                      id="outlined-start-adornment"
                      sx={{ m: 1, width: "50ch" }}
                      disabled
                      value={item.key}
                    />
                    <TextField
                      label={
                        post?.type === "MEAL" ? "Food Portion" : "Current Status"
                      }
                      id="outlined-start-adornment"
                      sx={{ m: 1, width: "50ch" }}
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
                </Box>
              ))}
            <Box sx={{ display: "flex", flexWrap: "wrap" }}>
              <TextField
                label={post?.type === "MEAL" ? "Food Type" : "Workout Type"}
                id="outlined-start-adornment"
                sx={{ m: 1, width: "50ch" }}
                name="key"
                onChange={handleInputChange}
                value={state.key}
              />
              <TextField
                label={post?.type === "MEAL" ? "Food Portion" : "Current Status"}
                id="outlined-start-adornment"
                sx={{ m: 1, width: "50ch" }}
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
            </Box>
            <hr />
          </>
        )}
        <DialogActions>
          <Button variant="contained" onClick={handleUpdate}>
            Update
          </Button>
          <Button
            variant="contained"
            onClick={onClose}
            style={{ backgroundColor: "#b74141", color: "white" }}
          >
            Cancel
          </Button>
        </DialogActions>
      </div>
    </Modal>
  );
};

export default EditPostModal;
