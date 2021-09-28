import { combineReducers } from "redux";
import { userReducer } from "./userReducer";
import { authReducer } from "./authReducer";

export const rootReducer = combineReducers({
  user: userReducer,
  token: authReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
