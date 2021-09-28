import { GetTokenAction, TokenActionTypes } from "../../types/authState";

let token = "";
if (localStorage.getItem("user") || "") {
  token = JSON.parse(localStorage.getItem("user") || "");
}
const defaultState = token ? token : "";

export const authReducer = (state = defaultState, action: GetTokenAction) => {
  switch (action.type) {
    case TokenActionTypes.GET_TOKEN:
      return action.payload;
    default:
      return state;
  }
};
