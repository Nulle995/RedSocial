import { useContext, useState } from "react";

import { UserContext } from "../../contexts/UserContext";
import "./style.css";
import { APIToken } from "../../utils/api";

const Post = ({ setPosts, posts }) => {
  const { userData } = useContext(UserContext);
  const [formData, setFormData] = useState({
    user: userData.user_id,
    content: "",
    images: null,
  });
  const [imgPost, setImgPost] = useState();

  const handleChange = (e) => {
    const { id, value } = e.target;
    console.log(value);

    setFormData((prev) => ({ ...prev, [id]: value }));
    console.log(formData);
  };

  const handleFileChange = (e) => {
    const [file] = e.target.files;
    console.log(file);

    const reader = new FileReader();
    reader.onload = (event) => {
      console.log(event.target.result);
      setImgPost(event.target.result);
    };
    reader.readAsDataURL(file);
    console.log({ images: [file] });

    setFormData((prev) => ({ ...prev, images: [file] }));
  };

  const deleteImg = () => {
    setImgPost(null);
    setFormData((prev) => ({ ...prev, images: null }));
  };

  const handleSubmit = (e) => {
    console.log(formData);

    const formDataToSend = new FormData();
    formDataToSend.append("user", formData.user);
    formDataToSend.append("content", formData.content);

    if (formData.images) {
      formData.images.forEach((img) => {
        formDataToSend.append("images", img);
      });
    }

    e.preventDefault();
    const newPost = async () => {
      try {
        const res = await APIToken.post("posts/", formDataToSend);
        const { data } = res;
        console.log(data);
        setPosts((prev) => [data, ...prev]);
        setFormData((prev) => ({ ...prev, content: "" }));
        setImgPost(null);
      } catch (error) {
        console.log(error);
      }
    };
    newPost();
  };

  return (
    <section className="new-post">
      <section className="head">
        {userData.avatar ? (
          <img src={userData.avatar} />
        ) : (
          <img src="/avatar.jpg" alt="" />
        )}
      </section>
      <form onSubmit={handleSubmit}>
        <textarea
          type="text"
          placeholder="What is happening?"
          value={formData.content}
          onChange={handleChange}
          id="content"
          autoComplete="off"
        />
        <div>
          {imgPost ? <img src={imgPost} className="image-post" /> : null}
          {imgPost ? (
            <button onClick={deleteImg} className="image-delete">
              <span>❌</span>
            </button>
          ) : null}
        </div>
        <div className="footer">
          <div>
            <label htmlFor="image">📷</label>
            <input type="file" name="" id="image" onChange={handleFileChange} />
          </div>
          <button>Post</button>
        </div>
      </form>
    </section>
  );
};

export default Post;
