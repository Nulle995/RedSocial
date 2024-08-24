import { useContext } from "react";
import { Link } from "react-router-dom";

import { UserContext } from "../../contexts/UserContext";
import "./style.css";
import FollowButton from "../followButton/followButton";

const Users = ({ user, follow }) => {
  const { username, avatar } = user;
  const { userData, reload, setReload } = useContext(UserContext);
  console.log(user);

  return (
    <div className="user-component">
      <div className="user-info">
        <Link to={`/profile/${username}`}>
          <div className="avatar">
            {avatar ? (
              <img src={avatar} alt="" />
            ) : (
              <img src="/public/avatar.jpg" />
            )}
          </div>
        </Link>
        <Link to={`/profile/${username}`} className="username">
          <div>{username}</div>
        </Link>
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
