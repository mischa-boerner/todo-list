import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardSeperatorComponent } from './card-seperator.component';

describe('CardSeperatorComponent', () => {
  let component: CardSeperatorComponent;
  let fixture: ComponentFixture<CardSeperatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardSeperatorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardSeperatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
