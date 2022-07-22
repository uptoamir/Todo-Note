import React, { createContext, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocalStorage } from "../../core/hooks/useLocalStorage";
import { UserInfo } from "../types/userInfo";
import { LOGIN, LOGOUT } from "../../store/actions";
import type { RootState } from "../../store";

interface AuthContextInterface {
  isLoggedIn: () => boolean;
  isLoggingIn: boolean;
  isLoggingOut: boolean;
  login: (username: string, password: string) => Promise<any>;
  logout: () => Promise<any>;
  userInfo?: Partial<UserInfo>;
}

export const AuthContext = createContext({} as AuthContextInterface);

type AuthProviderProps = {
  children?: React.ReactNode;
};

const AuthProvider = ({ children }: AuthProviderProps) => {
  const account = useSelector((state: RootState) => state.account);
  const dispatch = useDispatch();
  const [authKey, setAuthKey] = useLocalStorage<string>("account-account", "");
  console.log(authKey);

  const userInfo = account.user;

  const isLoggedIn = () => {
    return account.isLoggedIn;
  };

  const handleLogin = async (username: string, password: any) => {
    const temp: { password?: string }[] = account.allUsers.filter(
      (element: any) => element.username === username
    );
    console.log(username, password, temp);
    if (temp.length === 0) {
      console.log("The User does not exist");
      return new Promise(function (resolve, reject) {
        reject("The User does not exist");
      });

      // return new Error();
    } else if (temp[0].password != password) {
      console.log("Password is invalid");
      return new Promise(function (resolve, reject) {
        reject("Password is invalid");
      });
    } else {
      const obj = {
        user: temp[0],
      };
      await dispatch<any>({ type: LOGIN, payload: obj });
      // snackbar.success(t("auth.register.notifications.success"));
    }
  };

  const handleLogout = async () => {
    await dispatch<any>({ type: LOGOUT });
    // return logout()
    //   .then((data) => {
    //     setAuthKey("");
    //     return data;
    //   })
    //   .catch((err) => {
    //     throw err;
    //   });
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        isLoggingIn: false,
        isLoggingOut: false,
        login: handleLogin,
        logout: handleLogout,
        userInfo,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  return useContext(AuthContext);
}

export default AuthProvider;
