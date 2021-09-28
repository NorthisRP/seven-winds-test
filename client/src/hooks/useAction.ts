import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import * as UserActionCreators from "../store/action-creators/user";
import { saveToken } from "./../store/action-creators/auth";

export const useAction = () => {
  const dispatch = useDispatch();
  return bindActionCreators({ ...UserActionCreators, saveToken }, dispatch);
};
