import { useState } from "react";
import Modal from "@mui/material/Modal";
import "./shareModal.scss";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { DialogActions, Typography } from "@mui/material";

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
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Share this post to your profile
        </Typography>
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
        <DialogActions>
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
        </DialogActions>
      </div>
    </Modal>
  );
};

export default ShareModal;
