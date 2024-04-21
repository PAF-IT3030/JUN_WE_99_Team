import { useState } from "react";
import Modal from "@mui/material/Modal";
import "./shareModal.scss";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const ShareModal = ({ open, onClose, onShare, text }) => {
  const [message, setMessage] = useState(text);

  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  const handleShare = () => {
    onShare(message);
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <div className="share-modal">
        <h3 className="modal-header">Share this post to your profile</h3>
        <TextField
          id="share-message"
          label="Add a caption to share this post."
          variant="outlined"
          value={message}
          onChange={handleChange}
          fullWidth
          multiline
          rows={4}
        />
        <div className="button-container">
          <Button variant="contained" onClick={handleShare}>
            Share
          </Button>
          <Button
            variant="contained"
            onClick={onClose}
            style={{ backgroundColor: "#b74141", color: "white" }}
          >
            Cancel
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ShareModal;
