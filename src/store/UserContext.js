import React, {
  createContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from "react";

import Cookies from "universal-cookie";
import useHttp from "../hooks/useHttp";

const UserContext = createContext({
  userData: {},
  setUserData: () => {},
  theme: localStorage.theme,
  setTheme: () => {},
  token: "",
});

export const UserContextProvider = (props) => {
  const [theme, setTheme] = useState(localStorage.theme);
  const [token, setToken] = useState("");
  const cookies = useMemo(() => new Cookies(), []);

  const { sendRequest: userDataRequest } = useHttp();

  const [userData, setUserData] = useState({
    user: {
      id: 0,
      username: null,
      name: null,
      email: null,
      description: null,
      avatar_url: null,
      created_at: null,
      updated_at: null,
      tags: null,
    },
    token: null,
  });

  const getUserData = useCallback(async () => {
    const userData = await userDataRequest({
      url: "/api/user",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${cookies.get("token")}`,
      },
    });
    setToken(cookies.get("token"));
    setUserData({ user: userData.data, token: cookies.get("token") });
  }, [userDataRequest, cookies]);

  useEffect(() => {
    (async () => {
      if (cookies.get("token")) {
        try {
          await getUserData();
        } catch (e) {
          console.error(e);
        }
      }
    })();
  }, [cookies, getUserData]);

  return (
    <UserContext.Provider
      value={{
        userData,
        setUserData,
        theme,
        setTheme,
        token,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContext;
