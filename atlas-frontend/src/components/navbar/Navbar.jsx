import "./navbar.scss";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearAuth } from "../../redux/auth/authSlice";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import PersonAdd from "@mui/icons-material/PersonAdd";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import { useState } from "react";
import SportsGymnasticsIcon from "@mui/icons-material/SportsGymnastics";
import request from "../../util/fetchUtil";
import { API_BASE_URL } from "../../constants";
import { toast } from "react-toastify";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ProfileEditModal from "../profileEdit/ProfileEditModal";

const Navbar = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [profileUpdateOpen, setProfileUpdateOpen] = useState(false);
  const open = Boolean(anchorEl);

  function deleteProfileById() {
    return request({
      url: API_BASE_URL + "/user/delete/" + user.id,
      method: "DELETE",
    });
  }

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const profileEditHandle = () => {
    setProfileUpdateOpen(true);
    handleClose();
  };

  const handleLogout = () => {
    handleClose();
    dispatch(clearAuth());
    localStorage.clear();
    navigate("/login");
  };

  const handleDeleteAccount = async () => {
    handleClose();
    try {
      await deleteProfileById();
      toast("profile remove successfully", { type: "success" });
      handleLogout();
    } catch (error) {
      toast("Oops something went wrong!", { type: "error" });
    }
  };

  const handleProfile = () => {
    handleClose();
    navigate("/profile");
  };

  const handleHome = () => {
    navigate("/");
  };

  return (
    <div className="navbar">
      <div className="left">
        <SportsGymnasticsIcon
          onClick={handleHome}
          sx={{ cursor: "pointer", mr: 1 }}
        />
        <Typography
          onClick={handleHome}
          variant="h6"
          className="logo"
          noWrap
          component="a"
          href="#app-bar-with-responsive-menu"
          sx={{
            mr: 2,
            display: { xs: "none", md: "flex" },
            fontFamily: "monospace",
            fontWeight: 700,
            letterSpacing: ".3rem",
            color: "inherit",
            textDecoration: "none",
          }}
        >
          Atlas
        </Typography>
        <div className="search">
          <SearchOutlinedIcon />
          <input type="text" placeholder="Search..." />
        </div>
      </div>
      <div className="right">
        <EmailOutlinedIcon />
        <NotificationsOutlinedIcon />
        <div className="user" onClick={handleClick}>
          <img
            src={
              user?.imageUrl ||
              "https://cdn-icons-png.flaticon.com/512/149/149071.png"
            }
            alt=""
          />
          <Typography sx={{ minWidth: 100 }}>{user?.name}</Typography>
          <KeyboardArrowDownIcon />
        </div>
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
          <MenuItem onClick={handleProfile}>
            <Avatar /> View Profile
          </MenuItem>
          <Divider />
          <MenuItem onClick={profileEditHandle}>
            <ListItemIcon>
              <PersonAdd fontSize="small" />
            </ListItemIcon>
            Update Profile
          </MenuItem>
          <MenuItem onClick={handleDeleteAccount}>
            <ListItemIcon>
              <Settings fontSize="small" />
            </ListItemIcon>
            Delete Account
          </MenuItem>
          <MenuItem onClick={handleLogout}>
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>
            Logout
          </MenuItem>
        </Menu>
      </div>
      {profileUpdateOpen && (
        <ProfileEditModal
          onClose={() => {
            setProfileUpdateOpen(false);
          }}
          open={profileUpdateOpen}
        />
      )}
    </div>
  );
};

export default Navbar;
