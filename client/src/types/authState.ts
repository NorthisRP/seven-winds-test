export enum TokenActionTypes {
  GET_TOKEN = "GET_TOKEN",
}
export interface GetTokenAction {
  type: TokenActionTypes.GET_TOKEN;
  payload: string;
}
