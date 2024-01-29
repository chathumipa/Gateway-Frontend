import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from 'src/app/Services/Student/api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-student-modal-component',
  templateUrl: './add-student-modal-component.component.html',
  styleUrls: ['./add-student-modal-component.component.css']
})
export class AddStudentModalComponentComponent {

  addStudentForm: FormGroup;

  constructor(
    public activeModal: NgbActiveModal,
    private apiService: ApiService,
    private formBuilder: FormBuilder
  ) {
    this.addStudentForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      mobile: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      nic: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      address: ['', Validators.required],
    });
  }

  addStudent() {
    if (this.addStudentForm.valid) {
      this.apiService.postStudentData(this.addStudentForm.value).subscribe(response => {
        console.log('Student added successfully:', response);
        location.reload();
        this.activeModal.close();
      });
    }
  }

  
}
