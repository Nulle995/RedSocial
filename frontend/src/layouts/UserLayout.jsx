import Nav from "../components/nav/Nav";
import Post from "../components/post/Post";
import "./userLayout.css";

const UserLayout = ({ children }) => {
  return (
    <div className="layout">
      <Nav />
      {children}
    </div>
  );
};

export default UserLayout;
