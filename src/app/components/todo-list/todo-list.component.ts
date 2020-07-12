import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';

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
    private _snackBar: MatSnackBar,
    public dialog: MatDialog
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

  openDialog(todo: ITodo) {
    const dialogRef = this.dialog.open(DialogContent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.deleteTodo(todo.id);
      }
    });
  }
}

@Component({
  selector: 'dialog-content',
  templateUrl: './dialog-content.html',
  styleUrls: ['./todo-list.component.css'],
})
export class DialogContent {}
