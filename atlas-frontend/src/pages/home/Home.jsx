import { useDispatch, useSelector } from "react-redux";
import Posts from "../../components/posts/Posts";
import "./home.scss";
import { useEffect } from "react";
import { getPost } from "../../redux/context/postSlice";

const Home = () => {
  const post = useSelector((state) => state.post.post);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPost("6620e9bbf9ec5d445799a82c"));
  }, [dispatch]);

  return <div className="home">{post && <Posts posts={[post]} />}</div>;
};

export default Home;
