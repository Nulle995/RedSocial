import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Aside from "../../components/aside/Aside";
import { API } from "../../utils/api";
import Users from "../../components/users/Users";

const Following = () => {
  const { username } = useParams();
  const [userData, setUserData] = useState();

  useEffect(() => {
    const getFollowing = async () => {
      try {
        const res = await API.get(`userprofile/${username}/`);
        const { data } = res;
        setUserData(data);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };

    getFollowing();
  }, [username]);

  return (
    <div className="home">
      <div>
        {userData
          ? userData?.following.map((user) => <Users user={user} follow bio />)
          : null}
      </div>
      <Aside />
    </div>
  );
};

export default Following;
