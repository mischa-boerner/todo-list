import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoHeaderCreateComponent } from './todo-header-create.component';

describe('TodoHeaderCreateComponent', () => {
  let component: TodoHeaderCreateComponent;
  let fixture: ComponentFixture<TodoHeaderCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodoHeaderCreateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TodoHeaderCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
