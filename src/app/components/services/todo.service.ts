import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';

import { ITodo, IUser } from './../../models/todos';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  itemsCollection: AngularFirestoreCollection<ITodo>;

  constructor(private http: HttpClient, private firebase: AngularFirestore) {}

  getTodoCollection() {
    const collection = (this.firebase.collection(
      'items'
    ) as AngularFirestoreCollection<ITodo>).snapshotChanges();
    return collection.pipe(
      map((actions) =>
        actions.map((action) => {
          const data = action.payload.doc.data() as ITodo;
          const id = action.payload.doc.id;
          return { id, ...data };
        })
      )
    );
  }

  getTodoById(id: string) {
    return this.firebase.doc<ITodo>(`items/${id}`).valueChanges();
  }

  deleteTodo(id: string) {
    (this.firebase.doc(`items/${id}`) as AngularFirestoreDocument<
      any
    >).delete();
  }

  getUserById(id: number): Observable<IUser> {
    const userData = this.http.get<IUser>(
      `https://jsonplaceholder.typicode.com/users/${id}`
    );

    return userData;
  }

  addTodo(todo: ITodo) {
    (this.firebase.collection('items') as AngularFirestoreCollection<
      ITodo
    >).add({ ...todo, user: 'Yasin' });
  }
}
