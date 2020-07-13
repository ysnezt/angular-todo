export interface ITodo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

export const initialTodo: ITodo = {
  userId: 0,
  id: 0,
  title: '',
  completed: false,
};

export interface IUser {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
}

export const initialUser: IUser = {
  id: 0,
  name: '',
  username: '',
  email: '',
  phone: '',
  website: '',
};

export interface ISnackbarError {
  message: string;
  status: number;
  url: string;
}
