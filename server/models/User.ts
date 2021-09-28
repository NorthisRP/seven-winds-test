const enum TaskType {
  created,
  in_progress,
  completed,
}

interface ITasks {
  id: number;
  name: string;
  type: TaskType;
}

interface IUser {
  user: {
    id: number;
    name: string;
    lastname: string;
    about: string;
    tasks: ITasks[];
  };
  pass: {
    login: string;
    password: string;
  };
}

export let Users: IUser[] = [
  {
    user: {
      id: 0,
      name: "Roman",
      lastname: "Petrov",
      about: "Frontend React developer",
      tasks: [
        { id: 1, name: "make a cake", type: TaskType.created },
        { id: 2, name: "go to shop", type: TaskType.in_progress },
        { id: 3, name: "go to shop", type: TaskType.completed },
      ],
    },
    pass: { login: "admin", password: "123" },
  },
  {
    user: {
      id: 1,
      name: "Someone",
      lastname: "Guy",
      about: "Who just want to find a chiirik",
      tasks: [],
    },
    pass: { login: "admin2", password: "124" },
  },
];
