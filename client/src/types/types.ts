export enum TaskType {
  created,
  in_progress,
  completed,
}

export interface ITasks {
  id: number;
  name: string;
  type: TaskType;
}

export interface IUser {
  id?: number;
  name: string;
  lastname: string;
  about: string;
  tasks: ITasks[];
}

export interface ILogin {
  token: string;
  userId: number;
}
