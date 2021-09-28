import { useCallback } from "react";
import { ILogin } from "../types/types";
import { useAction } from "./useAction";

const storageName = "user";
export const useAuth = () => {
  const { saveToken } = useAction();

  const login = useCallback((data: ILogin) => {
    localStorage.setItem(storageName, JSON.stringify(data));
    saveToken(data.token);
    // eslint-disable-next-line
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(storageName);
    saveToken("");
    // eslint-disable-next-line
  }, []);

  return { login, logout };
};
