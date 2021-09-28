import { Dispatch } from "redux";
import { GetTokenAction, TokenActionTypes } from "../../types/authState";

export const saveToken = (str: string) => {
  return (dispatch: Dispatch<GetTokenAction>) => {
    dispatch({
      type: TokenActionTypes.GET_TOKEN,
      payload: str,
    });
  };
};
