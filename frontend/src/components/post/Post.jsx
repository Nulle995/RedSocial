import { useContext, useState } from "react";

import { UserContext } from "../../contexts/UserContext";
import "./style.css";
import { APIToken } from "../../utils/api";

const Post = ({ setPosts, posts }) => {
  const { userData } = useContext(UserContext);
  const [formData, setFormData] = useState({
    user: userData.user_id,
    content: "",
  });
  console.log(userData);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
    console.log(formData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newPost = async () => {
      try {
        const res = await APIToken.post("posts/", formData);
        const { data } = res;
        console.log(data);
        setPosts((prev) => [data, ...prev]);
        setFormData((prev) => ({ ...prev, content: "" }));
      } catch (error) {
        console.log(error);
      }
    };
    newPost();
  };

  return (
    <section className="new-post">
      <section>
        {userData.avatar ? (
          <img src={userData.avatar} />
        ) : (
          <img src="/avatar.jpg" alt="" />
        )}
      </section>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="What is happening?"
          value={formData.content}
          onChange={handleChange}
          id="content"
          autoComplete="off"
        />
        <button>Post</button>
      </form>
    </section>
  );
};

export default Post;
