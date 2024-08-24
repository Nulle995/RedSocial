import { useContext, useEffect, useState } from "react";

import { UserContext } from "../../contexts/UserContext";
import { APIToken } from "../../utils/api";

const FollowButton = ({ user }) => {
  const { userData, reload, setReload } = useContext(UserContext);
  const [isFollowing, setIsFollowing] = useState(false);
  const [followData, setFollowData] = useState({
    user: user.pk,
    follower: userData?.user_id,
  });
  const [followPk, setFollowPk] = useState();
  const followingTo = () => {
    console.log(user);

    user.followers.find((follower) => {
      follower.follower_data.username === userData.username
        ? setIsFollowing(true)
        : setIsFollowing(false);
    });
  };
  useEffect(() => {
    setIsFollowing(false);

    followingTo();
  }, [user]);

  const handleFollow = () => {
    const follow = async () => {
      if (userData) {
        try {
          const res = await APIToken.post("followers/", followData);
          const { data } = res;
          setIsFollowing(true);
          setFollowPk(data.pk);
          // setReload(!reload);
          console.log(data);
        } catch (error) {
          console.log(error);
        }
      }
    };
    follow();
  };

  const handleUnfollow = () => {
    const unfollow = async () => {
      const followObj = user.followers.find(
        (follower) => follower.follower_data.username === userData.username
      );
      console.log(followObj);

      try {
        const res = await APIToken.delete(
          `followers/delete/${followObj ? followObj.pk : followPk}`
        );
        const { data } = res;
        // followingTo();
        setIsFollowing(false);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
    unfollow();
  };
  return (
    <div className="follow">
      {userData.username !== user.username ? (
        isFollowing ? (
          <button onClick={handleUnfollow}>Unfollow</button>
        ) : (
          <button onClick={handleFollow}>Follow</button>
        )
      ) : null}
      {}
    </div>
  );
};

export default FollowButton;
// user.followers.map((follower) => {
//   console.log(follower);

//   if (follower.follower_data.username == userData.username) {
//     setIsFollowing(true);
//     console.log("verdad");

//     return true;
//   } else {
//     console.log("mentira");

//     setIsFollowing(false);
//     return false;
//   }
// });
