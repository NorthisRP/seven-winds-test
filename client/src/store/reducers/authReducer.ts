import { GetTokenAction, TokenActionTypes } from "../../types/authState";

const token = JSON.parse(localStorage.getItem("user") || "")?.token;

const defaultState = token ? token : "";

export const authReducer = (state = defaultState, action: GetTokenAction) => {
  switch (action.type) {
    case TokenActionTypes.GET_TOKEN:
      return action.payload;
    default:
      return state;
  }
};
