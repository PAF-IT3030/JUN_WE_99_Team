import "./navbar.scss";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import LogoutIcon from "@mui/icons-material/Logout";
import { clearAuth } from "../../redux/auth/authSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(clearAuth());
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="navbar">
      <div className="left">
        <Link to="/" style={{ textDecoration: "none" }}>
          <Link to="/">
            <span>Atlas</span>
          </Link>
        </Link>
        <Link to="/">
          <HomeOutlinedIcon />
        </Link>
        <div className="search">
          <SearchOutlinedIcon />
          <input type="text" placeholder="Search..." />
        </div>
      </div>
      <div className="right">
        <EmailOutlinedIcon />
        <NotificationsOutlinedIcon />
        <Link to="/profile">
          <div className="user">
            <img
              src={
                user?.imageUrl ||
                "https://cdn-icons-png.flaticon.com/512/149/149071.png"
              }
              alt=""
            />
            <span>{user?.name}</span>
          </div>
        </Link>
        <LogoutIcon onClick={handleLogout} />
      </div>
    </div>
  );
};

export default Navbar;
