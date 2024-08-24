import { useEffect, useState } from "react";
import "./style.css";
import { Link } from "react-router-dom";

const PostsList = ({ posts }) => {
  const [postsList, setPostsList] = useState([]);
  useEffect(() => {
    setPostsList(posts);
  }, [posts]);
  return (
    <section className="posts-list">
      {postsList?.map((post) => {
        const date = new Date(post.created_at);
        const now = new Date();

        const difference = now - date;
        const diffInHours = Math.floor(difference / (1000 * 60 * 60));
        const horas = () => {
          if (diffInHours >= 24) {
            return formattedDate;
          } else if (diffInHours > 1) {
            return `hace ${diffInHours} horas`;
          } else if (diffInHours == 1) {
            return `hace ${diffInHours} hora`;
          } else if (diffInHours < 1) {
            return "hace menos de 1 hora";
          }
        };

        const day = date.getDate();
        const month = date.getMonth();
        const year = date.getFullYear();
        const formattedDate = `${day}/${month + 1}/${year}`;
        return (
          <article key={post.pk} className="post">
            <Link to={`/profile/${post.author.username}`}>
              <div className="avatar">
                {post.author.avatar ? (
                  <img src={post.author.avatar} />
                ) : (
                  <img src="/avatar.jpg" alt="" />
                )}
              </div>
            </Link>
            <div>
              <div className="author">
                <Link to={`/profile/${post.author.username}`}>
                  <span className="username">{post.author.username}</span>
                </Link>
                <span className="date">{horas()}</span>
              </div>
              <div className="content">{post.content}</div>
              <div>❤️ {post.likes?.length ? post.likes.length : "0"}</div>
            </div>
          </article>
        );
      })}
    </section>
  );
};

export default PostsList;
