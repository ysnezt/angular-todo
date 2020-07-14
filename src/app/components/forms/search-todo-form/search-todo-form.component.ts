import { FormControl, Validators } from '@angular/forms';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-search-todo-form',
  templateUrl: './search-todo-form.component.html',
  styleUrls: ['./search-todo-form.component.css'],
})
export class SearchTodoFormComponent implements OnInit {
  constructor() {}
  searchItem = new FormControl('');
  @Output() searchTodo: EventEmitter<string> = new EventEmitter();

  ngOnInit(): void {}

  searchTodoItem() {
    this.searchTodo.emit(this.searchItem.value);
  }

  clearSearchForm() {
    this.searchItem.setValue('');
    this.searchTodo.emit('');
  }
}
