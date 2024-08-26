import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class HomeService {

  private preVisitorApiUrl = 'http://localhost:5166/api/PreApprovedVisitors'; 
  private employeeApiUrl = 'http://localhost:5166/api/Employee';
  

  constructor(private http: HttpClient) { }

  getPreApprovedVisitors(): Observable<PreApprovedVisitor[]> {
    return this.http.get<PreApprovedVisitor[]>(this.preVisitorApiUrl);
  }

  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.employeeApiUrl);
  }
}

export interface PreApprovedVisitor {
  id: number;
  name: string;
  companyName: string;
}

export interface Employee {
  id: number;
  empName: string;
  designation : string;
  empEmail : string;
}
