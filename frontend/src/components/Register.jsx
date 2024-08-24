import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { UserContext } from "../contexts/UserContext";
import { API } from "../utils/api";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../utils/constants";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    first_name: "",
    last_name: "",
    email: "",
    bio: "",
    birth: "",
  });
  const changeData = (el) => {
    const { id, value } = el.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
    console.log(formData);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const getToken = async () => {
      try {
        const res = await API.post("userprofiles/", formData);
        const { data } = res;
        console.log(data);
        console.log(res);

        localStorage.setItem(ACCESS_TOKEN, data.access);
        localStorage.setItem(REFRESH_TOKEN, data.refresh);
      } catch (error) {
        console.log(error);
        console.log("error");
      }
    };
    getToken();
  };
  return (
    <form onSubmit={handleLogin}>
      <h1>Register</h1>
      <label htmlFor="username">Username: </label>
      <input
        type="text"
        id="username"
        value={formData.username}
        onChange={changeData}
      />
      <label htmlFor="password">Password: </label>
      <input
        type="password"
        name=""
        id="password"
        value={formData.password}
        onChange={changeData}
      />
      <label htmlFor="fN">First Name: </label>
      <input
        type="text"
        id="first_name"
        value={formData.first_name}
        onChange={changeData}
      />
      <label htmlFor="lN">Last Name: </label>
      <input
        type="text"
        id="last_name"
        value={formData.last_name}
        onChange={changeData}
      />
      <label htmlFor="email">Email: </label>
      <input
        type="email"
        id="email"
        value={formData.email}
        onChange={changeData}
      />
      <label htmlFor="bio">Bio: </label>
      <textarea id="bio" value={formData.bio} onChange={changeData} />
      <label htmlFor="birth">Birth Date: </label>
      <input
        type="date"
        id="birth"
        value={formData.birth}
        onChange={changeData}
      />
      <button>Register</button>
    </form>
  );
};

export default Register;
