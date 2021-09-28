import { UserAction, UserActionTypes, UserState } from "../../types/userState";

export const initialState: UserState = {
  user: { id: 0, name: "", lastname: "", about: "", tasks: [] },
  loading: false,
  error: "",
};

export const userReducer = (
  state = initialState,
  action: UserAction
): UserState => {
  switch (action.type) {
    case UserActionTypes.GET_USER:
      return { user: action.payload, loading: false, error: "" };
    case UserActionTypes.FETCH_USER:
      return { user: state.user, loading: true, error: "" };
    case UserActionTypes.FETCH_ERROR:
      return { user: state.user, loading: false, error: action.payload };
    default:
      return state;
  }
};
