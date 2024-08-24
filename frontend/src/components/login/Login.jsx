import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { UserContext } from "../../contexts/UserContext";
import { API } from "../../utils/api";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../../utils/constants";
import "./style.css";

const Login = () => {
  const navigate = useNavigate();
  const { reload, setReload } = useContext(UserContext);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const changeData = (el) => {
    const { id, value } = el.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
    console.log(formData);
  };

  const login = (e) => {
    e.preventDefault();
    const getToken = async () => {
      try {
        const res = await API.post("token/", formData);
        const { data } = res;
        console.log(data);
        console.log(res);

        localStorage.setItem(ACCESS_TOKEN, data.access);
        localStorage.setItem(REFRESH_TOKEN, data.refresh);
        navigate("/");
        setReload(!reload);
      } catch (error) {
        console.log(error);
        console.log("error");
      }
    };
    getToken();
  };
  return (
    <form onSubmit={login}>
      <h1>Login</h1>
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
      <button>Aceptar</button>
    </form>
  );
};

export default Login;
