import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddStudentModalComponentComponent } from './add-student-modal-component.component';

describe('AddStudentModalComponentComponent', () => {
  let component: AddStudentModalComponentComponent;
  let fixture: ComponentFixture<AddStudentModalComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddStudentModalComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddStudentModalComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
