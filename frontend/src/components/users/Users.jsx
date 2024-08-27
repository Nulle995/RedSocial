import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { UserContext } from "../../contexts/UserContext";
import "./style.css";
import FollowButton from "../followButton/followButton";

const Users = ({ user, follow, bio }) => {
  const { userData, reload, setReload } = useContext(UserContext);
  // const [bio, setBio] = useState();
  const [newUser, setNewUser] = useState({
    pk: user.pk,
    user: user.username,
    avatar: user.avatar,
    bio: user.bio,
  });

  const getUsername = () => {
    if (user?.user?.username) {
      setNewUser({
        pk: user.user.pk,
        user: user.user.username,
        bio: user.user.bio,
      });
    } else {
    }
  };

  useEffect(() => {
    getUsername();
  }, []);

  return (
    <div className="user-component" key={newUser.pk}>
      <div className="user-info">
        <Link to={`/profile/${newUser.user}`}>
          <div className="avatar">
            {newUser.avatar ? (
              <img src={newUser.avatar} alt="" />
            ) : (
              <img src="/public/avatar.jpg" />
            )}
          </div>
        </Link>
        <div className="username">
          <Link to={`/profile/${newUser.user}`} className="username">
            <div>{newUser.user}</div>
          </Link>
          <div>{bio ? newUser.bio : null}</div>
        </div>
        {follow ? <FollowButton user={user} /> : null}
      </div>
    </div>
  );
};

export default Users;
{
  /* {isFollowing ? (
              <button onClick={handleUnfollow}>Unfollow</button>
            ) : (
              <button onClick={handleFollow}>Follow</button>
            )} */
}

// const [isFollowing, setIsFollowing] = useState(false);
// const [followData, setFollowData] = useState({
//   user: user.pk,
//   follower: userData?.user_id,
// });
// const [followPk, setFollowPk] = useState();
// const followingTo = () =>
//   user.followers.map((follower) => {
//     if (follower.follower_data.username == userData.username) {
//       setIsFollowing(true);
//       return true;
//     } else {
//       console.log(follower);

//       setIsFollowing(false);
//     }
//   });
// useEffect(() => {
//   followingTo();
// }, []);

// const handleFollow = () => {
//   const follow = async () => {
//     if (userData) {
//       try {
//         const res = await APIToken.post("followers/", followData);
//         const { data } = res;
//         setIsFollowing(true);
//         setFollowPk(data.pk);
//         // setReload(!reload);
//         console.log(data);
//       } catch (error) {
//         console.log(error);
//       }
//     }
//   };
//   follow();
// };

// const handleUnfollow = () => {
//   const unfollow = async () => {
//     const followObj = user.followers.find(
//       (follower) => follower.follower_data.username === userData.username
//     );
//     console.log(followObj);

//     try {
//       const res = await APIToken.delete(
//         `followers/delete/${followObj ? followObj.pk : followPk}`
//       );
//       const { data } = res;
//       // followingTo();
//       setIsFollowing(false);
//       console.log(data);
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   unfollow();
// };
