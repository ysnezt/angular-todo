export interface ITodo {
  id?: string;
  title: string;
  user: string;
}

export const initialTodo: ITodo = {
  title: '',
  user: '',
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
