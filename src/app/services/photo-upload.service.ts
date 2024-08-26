import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PhotoUploadService {

  private apiUrl = 'http://localhost:5166/api/ImageUpload'; // Replace with your API base URL

  constructor(private http: HttpClient) { }

//   uploadPhotos(images: { photo: string, idPhoto: string }): Observable<any> {
//     return this.http.post(`${this.apiUrl}/upload`, images);
//   }
// }

uploadImages(images: { photo: string; idCard: string }): Observable<any> {
  return this.http.post(`${this.apiUrl}/upload`, images).pipe(
    catchError((error: HttpErrorResponse) => {
      console.error('Upload failed', error);
      return throwError(() => new Error('Upload failed'));
    })
  );
}
  // uploadImages(photo: File, idCard: File): Observable<any> {
  //   const formData: FormData = new FormData();
  //   formData.append('photo', photo);
  //   formData.append('idCard', idCard);

  //   return this.http.post(`${this.apiUrl}/upload`, formData).pipe(
  //     catchError((error: HttpErrorResponse) => {
  //       console.error('Upload failed', error);
  //       return throwError(() => new Error('Upload failed'));
  //     })
  //   );
  // }
}

// export interface PhotoUpload{

// }
