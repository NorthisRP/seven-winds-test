import { IUser } from "./types";

export enum UserActionTypes {
  GET_USER = "GET_USER",
  FETCH_USER = "FETCH_USER",
  FETCH_ERROR = "FETCH_ERROR",
}

interface FetchUserAction {
  type: UserActionTypes.FETCH_USER;
}

interface FetchUserSuccessAction {
  type: UserActionTypes.GET_USER;
  payload: IUser;
}

interface FetchUserErrorAction {
  type: UserActionTypes.FETCH_ERROR;
  payload: string;
}

export interface UserState {
  user: IUser;
  loading: boolean;
  error: string;
}

export type UserAction =
  | FetchUserAction
  | FetchUserErrorAction
  | FetchUserSuccessAction;
