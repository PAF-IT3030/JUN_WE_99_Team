import "./profile.scss";
import FacebookTwoToneIcon from "@mui/icons-material/FacebookTwoTone";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import Posts from "../../components/posts/Posts";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Typography } from "@mui/material";
import request from "../../util/fetchUtil";
import { API_BASE_URL } from "../../constants";
import { clearPost, postLoadingSuccess } from "../../redux/context/postSlice";
import { toast } from "react-toastify";

const Profile = () => {
  const posts = useSelector((state) => state.post.posts);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  function getSharedPosts() {
    return request({
      url: API_BASE_URL + "/api/v1/shared-posts",
      method: "GET",
    });
  }

  useEffect(() => {
    const load = async () => {
      try {
        const posts = await getSharedPosts();
        dispatch(postLoadingSuccess(posts));
      } catch (error) {
        toast.error("Error loading posts!");
      }
    };
    load();
    return () => {
      dispatch(clearPost());
    };
  }, [dispatch]);

  return (
    <div className="profile">
      <div className="images">
        <img
          src="https://images.pexels.com/photos/13440765/pexels-photo-13440765.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          alt=""
          className="cover"
        />
        <img
          src={
            user?.imageUrl ||
            "https://cdn-icons-png.flaticon.com/512/149/149071.png"
          }
          alt=""
          className="profilePic"
        />
      </div>
      <div className="profileContainer">
        <div className="uInfo">
          <div className="left">
            <a href="http://facebook.com">
              <FacebookTwoToneIcon fontSize="large" />
            </a>
            <a href="http://facebook.com">
              <InstagramIcon fontSize="large" />
            </a>
            <a href="http://facebook.com">
              <TwitterIcon fontSize="large" />
            </a>
          </div>
          <div className="center">
            <Typography id="modal-modal-title" variant="h4" component="h2">
              {user?.name}
            </Typography>
          </div>
          <div className="right">
            <EmailOutlinedIcon />
          </div>
        </div>
        <Posts posts={posts} />
      </div>
    </div>
  );
};

export default Profile;
