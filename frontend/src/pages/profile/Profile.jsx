import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { API } from "../../utils/api";
import Aside from "../../components/aside/Aside";
import "./style.css";
import PostsList from "../../components/postsList/PostsList";
import FollowButton from "../../components/followButton/followButton";

const Profile = () => {
  const { username } = useParams();

  const [userProfile, setUserProfile] = useState();

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await API.get(`userprofile/${username}/`);
        const { data } = res;
        setUserProfile(data);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  }, [username]);

  return (
    <div className="home">
      <div className="profile-body">
        {userProfile ? (
          <div className="profile-user">
            <div className="header_photo">
              <img src={userProfile.header_photo} alt="" />
            </div>
            <div className="body">
              <div className="info">
                {userProfile.avatar ? (
                  <img src={userProfile.avatar}></img>
                ) : (
                  <img src="http://127.0.0.1:8000/media/profile_avatar.png"></img>
                )}
                {userProfile ? <FollowButton user={userProfile} /> : null}
              </div>
              <div className="username">
                <h3>{userProfile.username}</h3>
                <span>@{userProfile.username}</span>
              </div>
              <div className="bio">{userProfile.bio}</div>
              <div className="contact">📧{userProfile.email}</div>
              <div className="stats">
                <Link to={`following`}>
                  {userProfile.following.length} Following
                </Link>
                <Link>{userProfile.followers.length} Followers</Link>
              </div>
            </div>
            <section className="user-posts">
              {userProfile.posts
                ? userProfile.posts.map((post) => <PostsList post={post} />)
                : "No hay posts..."}
            </section>
          </div>
        ) : (
          "Usuario no encontrado"
        )}
      </div>
      <Aside />
    </div>
  );
};

export default Profile;
