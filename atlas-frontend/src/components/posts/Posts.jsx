import Post from "../post/Post";
import "./posts.scss";

const Posts = ({ posts }) => {
  return (
    <div className="posts">
      {posts.map((post) => (
        <div className="posts">
          <Post
            post={post.sharedPost || post}
            key={post.id}
            sharedPost={post.sharedPost ? post : null}
          />
        </div>
      ))}
    </div>
  );
};

export default Posts;
