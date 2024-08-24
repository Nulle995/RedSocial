import { useContext } from "react";
import { Link, useLocation } from "react-router-dom";

import { UserContext } from "../../contexts/UserContext";
import Users from "../users/Users";
import { capitalize } from "../../utils/functions";
import "./style.css";

// icons
import { MdHomeFilled } from "react-icons/md";
import { FiSearch } from "react-icons/fi";
import { RiNotification2Line } from "react-icons/ri";
import { MdMailOutline } from "react-icons/md";
import { FaRegUser } from "react-icons/fa6";

const Nav = () => {
  const url = useLocation();
  const { userData } = useContext(UserContext);

  const navLinks = [
    { name: "home", url: "/", icon: <MdHomeFilled /> },
    { name: "explore", url: "/explore", icon: <FiSearch /> },
    {
      name: "notifications",
      url: "/notifications",
      icon: <RiNotification2Line />,
    },
    { name: "messages", url: "/messages", icon: <MdMailOutline /> },
    {
      name: "profile",
      url: `/profile/${userData.username}`,
      icon: <FaRegUser />,
    },
  ];

  return (
    <nav>
      <div className="nav-links">
        {navLinks.map((link) => {
          const isSelected = url.pathname === link.url;
          return (
            <Link
              to={link.url}
              style={isSelected ? { fontWeight: 700 } : {}}
              key={link.name}
            >
              {link.icon}
              {capitalize(link.name)}
            </Link>
          );
        })}
      </div>
      <div className="profile">
        <Users user={userData} follow={false} bio={false} />
      </div>
    </nav>
  );
};

export default Nav;
