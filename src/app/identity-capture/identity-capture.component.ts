import { Component, OnInit } from '@angular/core';
import { WebcamImage, WebcamInitError, WebcamUtil } from 'ngx-webcam';
import { Subject, Observable } from 'rxjs';
import { PhotoUploadService } from '../services/photo-upload.service';
import { Router } from '@angular/router';

@Component({
      selector: 'identity-capture',
      templateUrl: './identity-capture.component.html',
      styleUrls: ['./identity-capture.component.css']
    })

export class IdentityCaptureComponent implements OnInit {

  public webcamImage: WebcamImage | null = null;
  public webcamImageId: WebcamImage | null = null;
  private triggerPhoto: Subject<void> = new Subject<void>();
  private triggerIdPhoto: Subject<void> = new Subject<void>();
  public showPhotoWebcam: boolean = false;
  public showIdWebcam: boolean = false;
  uploadSuccess: boolean = false;
  errorMessage: string = '';

  lastRegistration: any;

  constructor(private photoUploadService: PhotoUploadService, private router : Router) { }

  ngOnInit(): void {
    WebcamUtil.getAvailableVideoInputs().then((mediaDevices: MediaDeviceInfo[]) => {
      if (mediaDevices && mediaDevices.length > 0) {
        console.log('Webcam available');
      }
    });

    this.loadLastRegistrationData();
  }

  loadLastRegistrationData(): void {
    const storedData = localStorage.getItem('lastRegistration');
    if (storedData) {
      this.lastRegistration = JSON.parse(storedData);
    }
  }

  public triggerPhotoSnapshot(): void {
    this.triggerPhoto.next();
  }

  public triggerIdPhotoSnapshot(): void {
    this.triggerIdPhoto.next();
  }

  public handlePhotoImage(webcamImage: WebcamImage): void {
    this.webcamImage = webcamImage;
    this.showPhotoWebcam = false; 
  }

  public handleIdPhotoImage(webcamImage: WebcamImage): void {
    this.webcamImageId = webcamImage;
    this.showIdWebcam = false;
  }

  public get photoTriggerObservable(): Observable<void> {
    return this.triggerPhoto.asObservable();
  }

  public get idPhotoTriggerObservable(): Observable<void> {
    return this.triggerIdPhoto.asObservable();
  }

  public togglePhotoWebcam(): void {
    this.showPhotoWebcam = !this.showPhotoWebcam;
    this.webcamImage = null;
  }

  public toggleIdWebcam(): void{
    this.showIdWebcam = !this.showIdWebcam;
    this.webcamImageId = null;
  }

  // onSubmit(): void {
  //   if (this.webcamImage && this.webcamImageId) {
  //     const images = {
  //       photo: this.webcamImage.imageAsBase64,
  //       idCard: this.webcamImageId.imageAsBase64
  //     };

  //     this.photoUploadService.uploadImages(images).subscribe(
  //       response => console.log('Upload successful', response),
  //       error => console.error('Upload failed', error)
  //     );
  //   }
  // }


  public onClickAdd(): void {
    if (this.webcamImage && this.webcamImageId) {
      const images = {
        photo: this.webcamImage.imageAsBase64,
        idCard: this.webcamImageId.imageAsBase64,
      };

      this.photoUploadService.uploadImages(images).subscribe({
        next: (response) => {
          this.uploadSuccess = true;
          this.errorMessage = '';
          console.log('Upload successful', response);
        },
        error: (error) => {
          this.uploadSuccess = false;
          this.errorMessage = 'Image upload failed. Please try again.';
          console.error('Upload error', error);
        },
      });
    } else {
      this.errorMessage = 'Please capture both a photo and an ID card.';
    }
  }

  // public onSubmit(): void {
  //   if (this.webcamImage && this.webcamImageId) {
  //     const images = {
  //       photo: this.webcamImage.imageAsBase64,
  //       idCard: this.webcamImageId.imageAsBase64,
  //     };

  //     this.photoUploadService.uploadImages(images).subscribe({
  //       next: (response) => {
  //         this.uploadSuccess = true;
  //         this.errorMessage = '';
  //         console.log('Upload successful', response);
  //       },
  //       error: (error) => {
  //         this.uploadSuccess = false;
  //         this.errorMessage = 'Image upload failed. Please try again.';
  //         console.error('Upload error', error);
  //       },
  //     });
  //   } else {
  //     this.errorMessage = 'Please capture both a photo and an ID card.';
  //   }
  // }

  public onSubmit(): void{
    console.log("ok");
  }

  closeRegistrationForm(){
    this.router.navigate(['/']);
  }
  
}
