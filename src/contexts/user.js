import { createContext, useContext, useState, useEffect } from "react";
import { getUserAPI } from "../api/user";

const UserContext = createContext(null);

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState({});

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    const response = await getUserAPI();

    if (response.success) {
      setUser(response.data);
    }
  };

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};

export const useUserContext = () => useContext(UserContext);
