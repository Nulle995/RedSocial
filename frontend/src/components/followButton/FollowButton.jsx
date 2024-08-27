import { useContext, useEffect, useState } from "react";

import { UserContext } from "../../contexts/UserContext";
import { APIToken } from "../../utils/api";

const FollowButton = ({ user }) => {
  const { userData, reload, setReload } = useContext(UserContext);
  const [isFollowing, setIsFollowing] = useState(false);
  const [followData, setFollowData] = useState({
    user_id: user.pk,
    follower_id: userData?.user_id,
  });
  const [followPk, setFollowPk] = useState();
  const followingTo = () => {
    // userData.following.length > 0 &&
    //   userData.following.find((followedUser) => {
    //     console.log(user);
    //     console.log(userData);
    //     if (user?.user?.username) {
    //       console.log("entro en if");

    //       if (followedUser.user.username === user.user.username) {
    //         setIsFollowing(true);
    //         return true;
    //       }
    //     } else {
    //       console.log("entro en el else");

    //       if (followedUser.user.username === user.username) {
    //         console.log("entro en la otra condicional");

    //         setIsFollowing(true);
    //         return true;
    //       }
    //     }
    //   });

    if (user.followers) {
      user?.followers?.length > 0 &&
        user.followers.find((follower) => {
          follower.follower.username === userData.username
            ? setIsFollowing(true)
            : setIsFollowing(false);
        });
    } else {
      userData.following.find((followingUser) => {
        if (followingUser.user.username === user.user.username) {
          setIsFollowing(true);
          return true;
        }
      });
    }
  };

  useEffect(() => {
    setIsFollowing(false);

    followingTo();
  }, [user]);

  const handleFollow = () => {
    const follow = async () => {
      setIsFollowing(true);
      if (userData) {
        try {
          const res = await APIToken.post("followers/", followData);
          const { data } = res;
          setIsFollowing(true);
          setFollowPk(data.pk);
        } catch (error) {
          console.log(error);
          setIsFollowing(false);
        }
      }
    };
    follow();
  };

  const handleUnfollow = () => {
    const unfollow = async () => {
      setIsFollowing(false);

      const followObj = user.followers.find(
        (follower) => follower.follower.username === userData.username
      );

      try {
        const res = await APIToken.delete(
          `followers/delete/${followObj ? followObj.pk : followPk}`
        );
        const { data } = res;
        // followingTo();
        setIsFollowing(false);
      } catch (error) {
        console.log(error);
        setIsFollowing(true);
      }
    };
    unfollow();
  };
  return (
    <div className="follow">
      {userData.username !== user.username &&
      userData.username !== user?.user?.username ? (
        isFollowing ? (
          <button onClick={handleUnfollow}>Unfollow</button>
        ) : (
          <button onClick={handleFollow}>Follow</button>
        )
      ) : null}
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
