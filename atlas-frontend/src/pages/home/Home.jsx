import { useDispatch, useSelector } from "react-redux";
import Posts from "../../components/posts/Posts";
import "./home.scss";
import { useEffect } from "react";
import PostCreate from "../../components/postCreate/CreatePost";
import { toast } from "react-toastify";
import { API_BASE_URL } from "../../constants";
import { clearPost, postLoadingSuccess } from "../../redux/context/postSlice";
import request from "../../util/fetchUtil";

const Home = () => {
  const posts = useSelector((state) => state.post.posts);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  function getPosts() {
    return request({
      url: API_BASE_URL + "/api/v1/posts/",
      method: "GET",
    });
  }

  useEffect(() => {
    const load = async () => {
      try {
        const postData = await getPosts();
        dispatch(postLoadingSuccess(postData));
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
    <>
      {user?.id && (
        <div className="home">
          <PostCreate type={"GENERAL"}></PostCreate>

          <PostCreate type={"MEAL"}></PostCreate>

          <PostCreate type={"WORK_OUT"}></PostCreate>
          <Posts posts={posts} />
        </div>
      )}
    </>
  );
};

export default Home;
