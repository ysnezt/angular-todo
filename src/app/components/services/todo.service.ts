import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ITodo, IUser } from './../../models/todos';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  constructor(private http: HttpClient) {}

  getTodoCollection(): Observable<ITodo[]> {
    const collectionData = this.http.get<ITodo[]>(
      'https://jsonplaceholder.typicode.com/todos?_limit=10'
    );

    return collectionData;
  }

  getTodoById(id: string): Observable<ITodo> {
    const todoData = this.http.get<ITodo>(
      `https://jsonplaceholder.typicode.com/todos/${id}`
    );

    return todoData;
  }

  deleteTodo(id: number): Observable<any> {
    return this.http.delete(
      `https://jsonplaceholder.typicode.com/todos/${id}`,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
      }
    );
  }

  getUserById(id: number): Observable<IUser> {
    const userData = this.http.get<IUser>(
      `https://jsonplaceholder.typicode.com/users/${id}`
    );

    return userData;
  }
}
