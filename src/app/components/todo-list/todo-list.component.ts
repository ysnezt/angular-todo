import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

import { TodoService } from './../services/todo.service';
import { ITodo } from './../../models/todos';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
  providers: [],
})
export class TodoListComponent implements OnInit {
  todos: ITodo[] = [];
  displayedColumns: string[] = ['number', 'title', 'details', 'delete'];

  constructor(
    private todoService: TodoService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.todoService.getTodoCollection().subscribe((todos) => {
      this.todos = todos;
    });
  }

  deleteTodo(id: number): void {
    this.todoService.deleteTodo(id).subscribe((item) => {
      this.todos = this.todos.filter((item) => item.id !== id);
      this._snackBar.open('Item deleted successfully', 'close', {
        duration: 5000,
      });
    });
  }
}
