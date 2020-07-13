import { ITodo } from './../../../models/todos';
import { TodoService } from './../../services/todo.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { initialTodo } from 'src/app/models/todos';

@Component({
  selector: 'app-add-todo-form',
  templateUrl: './add-todo-form.component.html',
  styleUrls: ['./add-todo-form.component.css'],
})
export class AddTodoFormComponent implements OnInit {
  constructor() {}
  @Output() addTodo: EventEmitter<ITodo> = new EventEmitter();
  todoName = new FormControl('', Validators.required);

  ngOnInit(): void {}

  addTodoItem() {
    this.addTodo.emit({
      ...initialTodo,
      title: this.todoName.value,
      userId: 1,
    });
  }

  clearCreateForm() {
    this.todoName.setValue('');
  }
}
