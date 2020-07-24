import { Component, OnInit, Inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { TodoService } from './../services/todo.service';
import { ITodo, initialTodo } from './../../models/todos';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
  providers: [],
})
export class TodoListComponent implements OnInit {
  todos: Observable<ITodo[]>;
  displayedColumns: string[] = ['number', 'title', 'details', 'delete'];
  isLoading: boolean = false;

  constructor(
    private todoService: TodoService,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.todos = this.todoService.getTodoCollection();
    this.isLoading = false;
  }

  addTodo(todo: ITodo) {
    this.isLoading = true;

    this.todoService.addTodo(todo);

    this.isLoading = false;
    this._snackBar.open('Item created successfully', 'close', {
      duration: 5000,
      panelClass: ['successfull-snackbar'],
    });
  }

  deleteTodo(id: string) {
    this.isLoading = true;

    this.todoService.deleteTodo(id);

    this.isLoading = false;

    this._snackBar.open('Item deleted successfully', 'close', {
      duration: 5000,
      panelClass: ['successfull-snackbar'],
    });
  }

  searchTodo(input: string) {
    this.isLoading = true;
    this.todos = this.todoService
      .getTodoCollection()
      .pipe(
        map((actions) =>
          actions.filter((item) =>
            item.title.toLowerCase().startsWith(input.toLowerCase())
          )
        )
      );
    this.isLoading = false;
  }

  openDialog(todo: ITodo) {
    const dialogRef = this.dialog.open(DialogContent, {
      data: {
        todo,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
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
  constructor(@Inject(MAT_DIALOG_DATA) public data: { todo: ITodo }) {}
}
