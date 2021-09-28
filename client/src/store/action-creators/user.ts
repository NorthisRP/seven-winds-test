import axios from "axios";
import { Dispatch } from "redux";
import { UserAction, UserActionTypes } from "../../types/userState";

export const fetchUser = () => {
  return async (dispatch: Dispatch<UserAction>) => {
    try {
      dispatch({ type: UserActionTypes.FETCH_USER });
      const userId = JSON.parse(localStorage.getItem("user") || "").userId;
      const res = await axios.get("/api/user/get", {
        params: { userId },
      });
      dispatch({ type: UserActionTypes.GET_USER, payload: res.data });
    } catch (error: any) {
      dispatch({
        type: UserActionTypes.FETCH_ERROR,
        payload: "Ошибка загрузки пользователя!",
      });
    }
  };
};
export const fetchError = (str: string) => {
  return (dispatch: Dispatch<UserAction>) => {
    dispatch({
      type: UserActionTypes.FETCH_ERROR,
      payload: str,
    });
  };
};
