import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchTodoFormComponent } from './search-todo-form.component';

describe('SearchTodoFormComponent', () => {
  let component: SearchTodoFormComponent;
  let fixture: ComponentFixture<SearchTodoFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchTodoFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchTodoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
