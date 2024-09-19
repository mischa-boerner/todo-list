import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoHeaderSearchComponent } from './todo-header-search.component';

describe('TodoHeaderSearchComponent', () => {
  let component: TodoHeaderSearchComponent;
  let fixture: ComponentFixture<TodoHeaderSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodoHeaderSearchComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TodoHeaderSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
