// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { WebcamImage } from 'ngx-webcam';

// @Injectable({
//   providedIn: 'root'
// })
// export class RegisterGuestService {

//   // private apiUrl = 'http://localhost:5166/api/RegisterGuest';
//   private apiUrl = 'http://localhost:5166/api/RegisterGuest'

//   constructor(private http: HttpClient) { }

//   saveRegistration(data: any): Observable<any> {
//     return this.http.post(this.apiUrl, data);
//   }

//   getRegisterVisitors(): Observable<RegisterGuest[]> {
//     return this.http.get<RegisterGuest[]>(this.apiUrl);
//   }

//   uploadRegistrationData(formData: FormData): Observable<any> {
//     return this.http.post(`${this.apiUrl}/upload`, formData);
//   }
// }


// export interface RegisterGuest{
//   // id: number;
//   empName: string;
//   name: string;
//   companyName: string;
//   purposeToVisit: string;
//   contact: string;
//   email: string;
//   // photo? : string;
//   photo: WebcamImage | null;
//   idPhoto: WebcamImage | null;
// }



// ----------------------------------------

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface RegisterGuest {
  empName: string;
  name: string;
  companyName: string;
  purposeToVisit: string;
  contact: string;
  email: string;
  photo: any;
  idPhoto: any;
}

@Injectable({
  providedIn: 'root'
})
export class RegisterGuestService {

  private apiUrl = 'http://localhost:5166/api/RegisterGuest'

  constructor(private http: HttpClient) { }

  getRegisterVisitors(): Observable<RegisterGuest[]> {
        return this.http.get<RegisterGuest[]>(this.apiUrl);
      }


  saveRegistration(guest: RegisterGuest): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('empName', guest.empName);
    formData.append('name', guest.name);
    formData.append('companyName', guest.companyName);
    formData.append('purposeToVisit', guest.purposeToVisit);
    formData.append('contact', guest.contact);
    formData.append('email', guest.email);
    if (guest.photo) {
      formData.append('photo', guest.photo.imageAsBase64);
    }
    if (guest.idPhoto) {
      formData.append('idPhoto', guest.idPhoto.imageAsBase64);
    }
    console.log(guest.photo);
    console.log(guest.idPhoto);
    
    return this.http.post(`${this.apiUrl}/Upload`, formData);
  }

  sendApprovalEmail(employeeEmail: string): Observable<any> {
    const emailData = { empEmail: employeeEmail };
    return this.http.post(`${this.apiUrl}/send-approval-email`, emailData);
  }

  
}


