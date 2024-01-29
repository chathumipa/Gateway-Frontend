import { Component, OnInit, PipeTransform } from '@angular/core';
import { AsyncPipe, DecimalPipe } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, startWith, switchMap } from 'rxjs/operators';
import { NgbHighlight } from '@ng-bootstrap/ng-bootstrap';
import { Student } from 'src/app/Models/Student/student.model';
import { ApiService } from 'src/app/Services/Student/api.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddStudentModalComponentComponent } from '../add-student-modal-component/add-student-modal-component.component';
import { OrderPipe } from 'ngx-order-pipe';

@Component({
  selector: 'app-view-students',
  templateUrl: './view-students.component.html',
  styleUrls: ['./view-students.component.css'],
  providers: [OrderPipe]
})
export class ViewStudentsComponent implements OnInit {

  students: Student[] = [];
  searchControl = new FormControl();

  pagedStudents: Student[] = [];
  page = 1;

  selectedStudent: Student | null = null;
  isFormVisible: boolean = false;

  order: string = 'firstName';
  reverse: boolean = false;

  constructor(private apiService: ApiService, private modalService: NgbModal, private orderPipe: OrderPipe) { }

  ngOnInit(): void {
    this.searchStudent();
    this.GetStudents();
  }

  searchStudent(){
    this.searchControl.valueChanges.pipe(
      startWith(''),
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((searchTerm: string) => this.apiService.searchStudents(searchTerm))
    ).subscribe((searchResults: Student[]) => {
      this.students = searchResults;
    });

    this.updatePagedStudents();

  } 

  GetStudents(){
    this.apiService.getStudentData().subscribe(data => {
      this.students = data;
      this.updatePagedStudents();
    });
  }

  updatePagedStudents(): void {
    // Update the pagedStudents array based on the current page and itemsPerPage
    const itemsPerPage = 5;
    const startIndex = (this.page - 1) * itemsPerPage;
    this.pagedStudents = this.students.slice(startIndex, startIndex + itemsPerPage);
  }

  updatePage(event: number): void {
    this.page = event;
    this.updatePagedStudents();
  }

  addStudentModal() {
    this.modalService.open(AddStudentModalComponentComponent, { centered: true, size: 'lg' });
  }

  addStudent(student: Student) {
    this.apiService.postStudentData(student).subscribe(response => {
      console.log('Student added successfully:', response);
      this.GetStudents();
    });
  }

  selectStudent(student: Student): void {
    // Toggle form visibility
    this.isFormVisible = !this.isFormVisible;

    // If the form is visible, set the selected student
    this.selectedStudent = this.isFormVisible ? student : null;
  }

  deleteStudent(id: any): void {
      if (confirm('Are you sure you want to delete this student?')) {
        this.apiService.deleteStudent(id).subscribe(() => {
          this.selectedStudent = null;
          location.reload();
        });
      }
    } 

    sortTable(column: string): void {
      if (this.order === column) {
        this.reverse = !this.reverse;
      } else {
        this.order = column;
        this.reverse = false;
      }
  
      // Use the OrderPipe for sorting
      this.students = this.orderPipe.transform(this.students, [this.order], this.reverse);
      this.updatePagedStudents();
    }

}

