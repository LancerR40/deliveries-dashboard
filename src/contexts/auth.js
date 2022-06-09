import { createContext, useContext, useState, useEffect } from "react";
import { checkSessionAPI } from "../api/auth";

const AuthContext = createContext(null);

export const AuthContextProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    isAuth: false,
    role: null,
  });

  const checkSession = async () => {
    const response = await checkSessionAPI();

    if (!response) {
      return;
    }

    if (response.success) {
      const { auth, role } = response.data;

      setAuth({ isAuth: auth, role });
    }
  };

  useEffect(() => {
    checkSession();
  }, []);

  const value = {
    auth,
    setAuth,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => useContext(AuthContext);
