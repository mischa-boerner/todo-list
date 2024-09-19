import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoStatusComponent } from './todo-status.component';

describe('TodoStatusComponent', () => {
  let component: TodoStatusComponent;
  let fixture: ComponentFixture<TodoStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodoStatusComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TodoStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
