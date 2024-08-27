import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { UserContext } from "../../contexts/UserContext";
import "./style.css";
import Nav from "../../components/nav/Nav";
import Post from "../../components/post/Post";
import PostsList from "../../components/postsList/PostsList";
import { API } from "../../utils/api";
import Aside from "../../components/aside/Aside";

const Home = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState();
  const { reload, setReload, userData } = useContext(UserContext);

  const handleLogout = () => {
    localStorage.clear();
    setReload(!reload);
  };

  useEffect(() => {
    const getPosts = async () => {
      try {
        const res = await API.get("posts/");
        const { data } = res;

        setPosts(data);
      } catch (error) {}
    };
    getPosts();
  }, []);

  return (
    <main className="home">
      <section className="center">
        <Post setPosts={setPosts} posts={posts} />
        {posts
          ? posts.map((post) => <PostsList post={post} />)
          : "No hay posts"}
      </section>
      {/* <span className="access-link" onClick={handleLogout}>
        Logout
      </span> */}
      <Aside />
    </main>
  );
};

export default Home;
