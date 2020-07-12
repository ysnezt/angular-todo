import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITodo, initialTodo, IUser, initialUser } from './../../models/todos';
import { TodoService } from './../services/todo.service';

@Component({
  selector: 'app-todo-details',
  templateUrl: './todo-details.component.html',
  styleUrls: ['./todo-details.component.css'],
})
export class TodoDetailsComponent implements OnInit {
  id: string;
  todoDetails: ITodo = { ...initialTodo };
  user: IUser = { ...initialUser };

  constructor(
    private route: ActivatedRoute,
    private todoService: TodoService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.id = params.get('id');
    });

    this.todoService.getTodoById(this.id).subscribe((item) => {
      this.todoDetails = item;

      this.todoService.getUserById(item.userId).subscribe((user) => {
        this.user = user;
      });
    });
  }
}
