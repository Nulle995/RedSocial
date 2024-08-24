import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

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
              <img
                src="https://i0.wp.com/picjumbo.com/wp-content/uploads/camping-on-top-of-the-mountain-during-sunset-free-photo.jpg?w=600&quality=80"
                alt=""
              />
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
              <div className="stats">{userProfile.posts.length} Posts</div>
            </div>
            <section className="user-posts">
              <PostsList posts={userProfile.posts} />
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
