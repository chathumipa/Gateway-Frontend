import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { AddStudentComponent } from './Component/add-student/add-student.component';
import { ViewStudentComponent } from './Component/view-student/view-student.component';
import { ViewStudentsComponent } from './Component/view-students/view-students.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { AddStudentModalComponentComponent } from './Component/add-student-modal-component/add-student-modal-component.component';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [
    AppComponent,
    AddStudentComponent,
    ViewStudentComponent,
    ViewStudentsComponent,
    AddStudentModalComponentComponent
  ],
  imports: [
    NgxPaginationModule,
    NgbModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,

  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
