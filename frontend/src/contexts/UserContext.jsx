import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../utils/auth";
import { jwtDecode } from "jwt-decode";

export const UserContext = createContext();

export function UserProvider({ children }) {
  const [userData, setUserData] = useState();
  const [reload, setReload] = useState(false);
  useEffect(() => {
    console.log("renovando");

    const getToken = async () => {
      const token = await auth();
      if (token) {
        const decodedToken = jwtDecode(token);
        console.log(decodedToken);

        setUserData(decodedToken);
      } else {
        setUserData(null);
      }
    };
    getToken();
  }, [reload]);
  return (
    <UserContext.Provider value={{ userData, reload, setReload }}>
      {children}
    </UserContext.Provider>
  );
}
