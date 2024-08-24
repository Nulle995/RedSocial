import { useState } from "react";
import Login from "../../components/login/Login";
import Register from "../../components/Register";
import "./style.css";
const Index = () => {
  const [form, setForm] = useState(true);
  return (
    <main className="index">
      {form ? <Login /> : <Register />}{" "}
      <span className="access-link" onClick={() => setForm(!form)}>
        {form ? "Or Register!" : "Or Log In!"}
      </span>
    </main>
  );
};

export default Index;
