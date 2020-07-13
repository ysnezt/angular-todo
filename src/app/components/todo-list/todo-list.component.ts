import { Component, OnInit, Inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { TodoService } from './../services/todo.service';
import { ITodo, initialTodo } from './../../models/todos';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
  providers: [],
})
export class TodoListComponent implements OnInit {
  todos: ITodo[] = [];
  displayedColumns: string[] = ['number', 'title', 'details', 'delete'];
  isLoading: boolean = false;

  constructor(
    private todoService: TodoService,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.todoService.getTodoCollection().subscribe((todos) => {
      this.todos = todos as ITodo[];
      this.isLoading = false;
    });
  }

  addTodo(todo: ITodo) {
    this.isLoading = true;
    this.todoService.addTodo({ ...todo }).subscribe((item) => {
      this.todos = [item, ...this.todos];
      this.isLoading = false;
      this._snackBar.open('Item created successfully', 'close', {
        duration: 5000,
        panelClass: ['successfull-snackbar'],
      });
    });
  }

  deleteTodo(id: number): void {
    this.todoService.deleteTodo(id).subscribe(() => {
      this.todos = this.todos.filter((item) => item.id !== id);
      this._snackBar.open('Item deleted successfully', 'close', {
        duration: 5000,
        panelClass: ['successfull-snackbar'],
      });
    });
  }

  openDialog(todo: ITodo) {
    const dialogRef = this.dialog.open(DialogContent, {
      data: {
        todo,
      },
    });

    dialogRef.beforeClosed().subscribe((result) => {
      if (result) {
        this.deleteTodo(todo.id);
      }
    });
  }
}

@Component({
  selector: 'dialog-content',
  templateUrl: './dialog-content.component.html',
  styleUrls: ['./todo-list.component.css'],
})
export class DialogContent {
  isLoading: boolean = false;

  constructor(@Inject(MAT_DIALOG_DATA) public data: { todo: ITodo }) {}
}
