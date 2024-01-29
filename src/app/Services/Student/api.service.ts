import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Student } from 'src/app/Models/Student/student.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost:5021/api';

  constructor(private http: HttpClient) { }

  getStudentData(): Observable<any> {
    return this.http.get(`${this.apiUrl}/student`);
  }

  getStudentById(studentId: number): Observable<Student> {
    return this.http.get<Student>(`${this.apiUrl}/student/${studentId}`);
  }

  postStudentData(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/student`, data);
  }

  searchStudents(searchTerm: string): Observable<Student[]> {
    return this.getStudentData().pipe(
      map(students => students.filter((student: { firstName: string; lastName: string; mobile: { toString: () => string | string[]; }; email: { toString: () => string | string[]; }; nic: { toString: () => string | string[]; };}) =>
        student.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.mobile.toString().includes(searchTerm.toLowerCase()) ||
        student.email.toString().includes(searchTerm.toLowerCase()) ||
        student.nic.toString().includes(searchTerm.toLowerCase())
      ))
    );
  }

  updateStudent(student: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/student/${student.id}`, student);
  }

  deleteStudent(studentId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/student/${studentId}`);
  }
}
