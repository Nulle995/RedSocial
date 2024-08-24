import { useEffect, useState } from "react";

import { API } from "../../utils/api";
import Users from "../users/Users";
import "./style.css";

const WhoFollow = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await API.get("userprofiles/");
        const { data } = res;
        setUsers(data);
      } catch (error) {
        console.log(error);
      }
    };
    getUsers();
  }, []);

  return (
    <section className="who-follow">
      <h3>Who to follow</h3>
      <div className="user">
        {users ? (
          users.slice(0, 4).map((user) => <Users user={user} follow={true} />)
        ) : (
          <p>No hay usuarios para seguir...</p>
        )}
      </div>
    </section>
  );
};

export default WhoFollow;
