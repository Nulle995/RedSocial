import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";

import { UserContext } from "../../contexts/UserContext";
import { APIToken } from "../../utils/api";
import "./style.css";

const PostsList = ({ post }) => {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(0);
  const { userData } = useContext(UserContext);

  const handleLike = (e) => {
    console.log(post.pk);
    setLiked(true);
    setLikes((prev) => prev + 1);
    const formData = new FormData();
    formData.append("user", userData.user_id);
    formData.append("post", post.pk);
    const submitLike = async () => {
      try {
        const res = await APIToken.post("likes/", formData);
        const { data } = res;
        console.log(data);
      } catch (error) {
        setLiked(false);
        setLikes((prev) => prev - 1);

        console.log(error);
      }
    };
    submitLike();
  };

  const handleUnLike = () => {
    const deleteLike = async (pk) => {
      setLikes((prev) => prev - 1);
      setLiked(false);
      try {
        const res = await APIToken.delete(`likes/delete/${pk}/`);
        const { data } = res;
        setLiked(false);
        console.log(data);
      } catch (error) {
        console.log(error);
        setLikes((prev) => prev + 1);
        setLiked(true);
      }
    };

    post.likes.find((like) =>
      like.user.username === userData.username
        ? deleteLike(like.pk)
        : console.log("no")
    );
  };

  const formatContent = () => {
    // post.content.split("\n").forEach((word) => console.log(word));
    const formattedPost = post.content.split("\n").map((word) => word);
    const htmlPost = formattedPost.map((phrase) => phrase + "</br>");
    return htmlPost.join("");
  };
  formatContent();

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

  useEffect(() => {
    console.log(post);
    setLikes(post.likes.length);
    post.likes.find((like) =>
      like.user.username === userData.username
        ? setLiked(true)
        : setLiked(false)
    );
  }, [post]);
  return (
    <section className="posts-list">
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
          <div
            className="content"
            dangerouslySetInnerHTML={{ __html: formatContent() }}
          ></div>
          <div className="image-post">
            {post.images.length > 0 ? (
              <img src={post.images[0].img} alt="" />
            ) : null}
          </div>
          <div
            onClick={liked ? handleUnLike : handleLike}
            className={`${liked ? "liked" : ""} hearth`}
          >
            {liked ? (
              <svg viewBox="0 0 24 24" aria-hidden="true" fill="red">
                <g>
                  <path d="M20.884 13.19c-1.351 2.48-4.001 5.12-8.379 7.67l-.503.3-.504-.3c-4.379-2.55-7.029-5.19-8.382-7.67-1.36-2.5-1.41-4.86-.514-6.67.887-1.79 2.647-2.91 4.601-3.01 1.651-.09 3.368.56 4.798 2.01 1.429-1.45 3.146-2.1 4.796-2.01 1.954.1 3.714 1.22 4.601 3.01.896 1.81.846 4.17-.514 6.67z"></path>
                </g>
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" aria-hidden="true" fill="red">
                <g>
                  <path d="M16.697 5.5c-1.222-.06-2.679.51-3.89 2.16l-.805 1.09-.806-1.09C9.984 6.01 8.526 5.44 7.304 5.5c-1.243.07-2.349.78-2.91 1.91-.552 1.12-.633 2.78.479 4.82 1.074 1.97 3.257 4.27 7.129 6.61 3.87-2.34 6.052-4.64 7.126-6.61 1.111-2.04 1.03-3.7.477-4.82-.561-1.13-1.666-1.84-2.908-1.91zm4.187 7.69c-1.351 2.48-4.001 5.12-8.379 7.67l-.503.3-.504-.3c-4.379-2.55-7.029-5.19-8.382-7.67-1.36-2.5-1.41-4.86-.514-6.67.887-1.79 2.647-2.91 4.601-3.01 1.651-.09 3.368.56 4.798 2.01 1.429-1.45 3.146-2.1 4.796-2.01 1.954.1 3.714 1.22 4.601 3.01.896 1.81.846 4.17-.514 6.67z"></path>
                </g>
              </svg>
            )}
            {likes}
          </div>
        </div>
      </article>
    </section>
  );
};

export default PostsList;
