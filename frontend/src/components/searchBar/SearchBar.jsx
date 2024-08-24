import { useEffect, useState } from "react";

import { API } from "../../utils/api";
import Users from "../users/Users";
import "./style.css";

const SearchBar = () => {
  const [timeReq, setTimeReq] = useState(0);
  const [usersResults, setUserResults] = useState([]);
  const [usersSearch, setUsersSearch] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    const getUsersResults = async () => {
      if (timeReq == 1) {
        const dataResults = await getData();
        handleUsersResults(dataResults);
      }
    };
    getUsersResults();
  }, [timeReq]);

  // hacerlo desde el back 👇
  // hacerlo desde el back 👇
  // hacerlo desde el back 👇
  // hacerlo desde el back 👇
  const handleUsersResults = (data) => {
    if (usersSearch != "") {
      const finalResults = data.filter((user) => {
        if (user.username.toLowerCase().includes(usersSearch.toLowerCase())) {
          return user;
        }
      });
      console.log(finalResults.length);
      setUserResults(finalResults);
      return finalResults;
    } else {
      setUserResults([]);
    }
    // console.log(data);
  };

  const getData = () => {
    const getUsers = async () => {
      try {
        const res = await API.get("userprofiles/");
        const { data } = res;
        return data;
      } catch (error) {
        console.log(error);
      }
    };
    return getUsers();
  };

  const handleChange = () => {
    setTimeReq(0);
    setTimeout(() => {
      setTimeReq(1);
    }, 1500);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const getData = async () => {
      try {
        const res = await API.get("userprofiles/");
        const { data } = res;
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  };

  return (
    <form
      className="search-bar"
      onSubmit={handleSubmit}
      onChange={handleChange}
    >
      <input
        type="text"
        value={usersSearch}
        onChange={(e) => setUsersSearch(e.target.value)}
        placeholder="Search"
        onFocus={() => {
          setIsFocused(true);
        }}
        onBlur={() => {
          setIsFocused(false);
        }}
      />
      <div
        className="user-results"
        style={isFocused ? { display: "block" } : { display: "none" }}
      >
        {usersSearch.length > 0 ? (
          usersResults.length > 0 ? (
            usersResults.map((user) => <Users user={user} follow={false} />)
          ) : (
            <p className="generic">No results for your search...</p>
          )
        ) : (
          <p className="generic">Search something!</p>
        )}
      </div>
    </form>
  );
};

export default SearchBar;
