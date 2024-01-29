import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Student } from 'src/app/Models/Student/student.model';
import { ApiService } from 'src/app/Services/Student/api.service';

@Component({
  selector: 'app-view-student',
  templateUrl: './view-student.component.html',
  styleUrls: ['./view-student.component.css']
})
export class ViewStudentComponent implements OnInit, OnChanges {

  @Input() selectedStudent: Student | null = null;

  isEditMode: boolean = false;
  editedStudent: any = {};

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    this.loadStudentDetails(this.selectedStudent?.id);

    if (this.selectedStudent) {
      this.editedStudent = { ...this.selectedStudent };
  }
  }

  ngOnChanges(changes: SimpleChanges): void {
    
  }

  loadStudentDetails(studentId: number | undefined): void {
    if (studentId !== undefined) {
      this.apiService.getStudentById(studentId).subscribe(data => {
        this.selectedStudent = data;
      });
    } else {
      console.error('Student ID is undefined.');
    }
  }

  editStudent(): void {
    this.isEditMode = true;
  }

  updateStudent(): void {
    if (this.editedStudent.id) {
      console.log('editedStudent:', this.editedStudent); // Log the value here
      this.apiService.updateStudent(this.editedStudent).subscribe(updatedStudent => {
        this.selectedStudent = updatedStudent;
        this.isEditMode = false;
        location.reload();
      });
    }
  }
}
