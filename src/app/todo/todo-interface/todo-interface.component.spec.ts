import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoInterfaceComponent } from './todo-interface.component';

describe('TodoInterfaceComponent', () => {
  let component: TodoInterfaceComponent;
  let fixture: ComponentFixture<TodoInterfaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TodoInterfaceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TodoInterfaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
