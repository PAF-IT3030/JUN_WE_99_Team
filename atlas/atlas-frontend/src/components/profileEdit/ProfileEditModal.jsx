import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useReducer } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import request from "../../util/fetchUtil";
import { API_BASE_URL } from "../../constants";
import { userLoadingSuccess } from "../../redux/auth/authSlice";

const ProfileEditModal = ({ open, onClose }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const [state, setState] = useReducer(
    (prevState, newState) => {
      return { ...prevState, ...newState };
    },
    {
      name: user.name,
      email: user.email,
    }
  );

  const handleClose = () => {
    onClose(false);
  };

  const updateProfile = (id, user) => {
    return request({
      url: API_BASE_URL + "/user/edit/" + id,
      method: "PUT",
      body: JSON.stringify(user),
    });
  };

  const handleUpdate = async () => {
    try {
      const response = await updateProfile(user.id, {
        ...user,
        ...state,
      });

      if (response) {
        toast("Profile updated successfully", { type: "success" });
        dispatch(userLoadingSuccess(response));
        onClose();
      }
    } catch (error) {
      toast("Oops, Something went wrong", { type: "error" });
    }
  };

  const handleInputChange = (event) => {
    const target = event.target;
    const inputName = target.name;
    const inputValue = target.value;

    setState({
      [inputName]: inputValue,
    });
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: (event) => {
            event.preventDefault();
            handleUpdate();
          },
        }}
      >
        <DialogTitle>Update Profile</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please make sure to enter correct data when updating your profile
            details.
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="email"
            value={state.email}
            onChange={handleInputChange}
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            value={state.name}
            onChange={handleInputChange}
            name="name"
            label="Name"
            type="name"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button variant="contained" type="submit">
            Update Profile
          </Button>
          <Button
            variant="contained"
            onClick={handleClose}
            style={{ backgroundColor: "#b74141", color: "white" }}
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ProfileEditModal;
