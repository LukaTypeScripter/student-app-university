import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {IStudent} from "../shared/interfaces/student.interface";

@Injectable({
  providedIn: 'root'
})
export class CampaignService {
  private apiUrl = 'http://localhost:8080/api/students';
  $updateStudentData = new BehaviorSubject(true)

  constructor(private http: HttpClient) {}

  //
 getStudentUpdate$() {
    return this.$updateStudentData.asObservable()
  }

   triggerUpdate() {
    return this.$updateStudentData.next(true)
  }
  //
  getStudents(searchWord:string): Observable<IStudent> {
    return this.http.get<IStudent>(this.apiUrl + '?search=' + searchWord);
  }

  addStudent(student: IStudent): Observable<IStudent> {
    return this.http.post<IStudent>(this.apiUrl, student);
  }

  updateStudent(id: number, student: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, student);
  }

  deleteStudent(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
