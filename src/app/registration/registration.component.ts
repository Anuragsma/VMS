// import { Visitor } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HomeService, Employee, PreApprovedVisitor } from '../services/home.service';
import { RegisterGuest, RegisterGuestService } from '../services/register-guest.service';
import { PhotoUploadService } from '../services/photo-upload.service';
import { WebcamImage, WebcamInitError, WebcamUtil } from 'ngx-webcam';
import { Observable, Subject } from 'rxjs';
import { SideBarComponent } from '../side-bar/side-bar.component';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  employees: Employee[] = [];
  selectedEmployee?: Employee;
  preApprovedVisitors: PreApprovedVisitor[] = [];
  registerGuests : RegisterGuest[] = [];
  // selectedGuest?: RegisterGuest;

  // visitor: Visitor;

  // name: string = '';

  
  registerData : RegisterGuest ={
    empName: '',
    name: '',
    companyName: '',
    purposeToVisit: '',
    contact: '',
    email : '',
    photo : null ,
    idPhoto : null,
    // photo: null as WebcamImage | null
  }

  

  tempStoredVisitors : RegisterGuest[] = [];

  public webcamImage: WebcamImage | null = null;
  public webcamImageId: WebcamImage | null = null;
  private triggerPhoto: Subject<void> = new Subject<void>();
  private triggerIdPhoto: Subject<void> = new Subject<void>();
  public showPhotoWebcam: boolean = false;
  public showIdWebcam: boolean = false;
  uploadSuccess: boolean = false;
  errorMessage: string = '';
  public photoCaptured = false;
  public idPhotoCaptured = false;

  // isPopupVisible = false;
  isPhotoPopupVisible = false;
  isIdPopupVisible = false;
  showPhotoClickButton: boolean = true;
  showIdClickButton: boolean = true;

  // show = false;

  // empname: string = '';

  constructor(private homeService: HomeService, private registerGuestService: RegisterGuestService ,
    private photoUploadService: PhotoUploadService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
  ) { 
  }

  ngOnInit(): void {
    const storedVisitor = localStorage.getItem('selectedVisitor');
    if (storedVisitor) {
      const visitor = JSON.parse(storedVisitor);
      console.log('Retrieved Visitor:', visitor); 
      this.registerData.name = visitor.name;
      this.registerData.companyName = visitor.companyName;
    }

    this.homeService.getEmployees().subscribe(data => {
      this.employees = data;
    });

    WebcamUtil.getAvailableVideoInputs().then((mediaDevices: MediaDeviceInfo[]) => {
      if (mediaDevices && mediaDevices.length > 0) {
        console.log('Webcam available');
      }
    });

    this.route.queryParams.subscribe(params => {
      if (params['reset']) {
        this.resetForm(); 
      }
    });
    
    this.registerGuestService.getRegisterVisitors().subscribe(data => {
      this.registerGuests = data;
    });


  }

  resetForm(): void {
    this.registerData = {
      empName: '',
      name: '',
      companyName: '',
      purposeToVisit: '',
      contact: '',
      email: '',
      photo: null,
      idPhoto: null,
    };
  }


  public triggerPhotoSnapshot(): void {
    this.triggerPhoto.next();
    this.photoCaptured = true;
    this.showPhotoClickButton = false;

    // console.log(this.registerData);
}

  public triggerIdPhotoSnapshot(): void {
    this.triggerIdPhoto.next();
    this.idPhotoCaptured = true;
    this.showIdClickButton = false;
    console.log(this.registerData);
  }

  public handlePhotoImage(webcamImage: WebcamImage): void {
    this.webcamImage = webcamImage;
    this.storeCapturedImage(webcamImage);
    this.showPhotoWebcam = false; 
  }

  public handleIdPhotoImage(webcamImageId: WebcamImage): void {
    this.webcamImageId = webcamImageId;
    this.storeCaptureImageId(webcamImageId);
    this.showIdWebcam = false;
  }

  public get photoTriggerObservable(): Observable<void> {
    return this.triggerPhoto.asObservable();
  }

  public get idPhotoTriggerObservable(): Observable<void> {
    return this.triggerIdPhoto.asObservable();
  }

  public togglePhotoWebcam(): void {
    this.isPhotoPopupVisible = !this.isPhotoPopupVisible;
    // this.showPhotoWebcam = !this.showPhotoWebcam;
    this.showPhotoWebcam = true;
    this.webcamImage = null;
    this.showPhotoClickButton = true; 
  }

  resetPhoto() {
    this.webcamImage = null;
    this.showPhotoWebcam = true;
    this.showPhotoClickButton = true;
  }
  resetIdPhoto(){
    this.webcamImageId = null;
    this.showIdWebcam = true;
    this.showIdClickButton = true;
  }

  closePhotoPopup() {
    this.isPhotoPopupVisible = false;
    this.webcamImage = null;
    this.showPhotoWebcam = false;
  }

  closeIdPopup(){
    this.isIdPopupVisible = false;
    this.webcamImageId = null;
    this.showIdWebcam = false;
  }

  public toggleIdWebcam(): void{
    this.isIdPopupVisible = !this.isIdPopupVisible;
    // this.showIdWebcam = !this.showIdWebcam;
    this.showIdWebcam = true;
    this.webcamImageId = null;
    this.showIdClickButton = true;
  }

 // Add the current visitor data to the storedVisitors array
  onAddVisitor(): void {
    if (this.registerData.name && this.registerData.companyName) {
      const newRegisterData: RegisterGuest = { ...this.registerData};
      this.tempStoredVisitors.push(newRegisterData);

      this.resetForm();
  }
}

// Convert the image to a base64 string if necessary and store it
public storeCapturedImage(webcamImage: WebcamImage ): void {
  this.registerData.photo = webcamImage;
  
}
public storeCaptureImageId(webcamImageId: WebcamImage): void{
  this.registerData.idPhoto = webcamImageId;
}

  // onNext() : void {
    
  //   this.registerGuestService.saveRegistration(this.registerData).subscribe(response => {
  //     console.log('Registration successful:', response);
  //     this.router.navigate(['/identity-capture']); // Redirect to ImageUpload page
  //   }, error => {
  //     console.error('Error during registration:', error);
  //   });
  // }

  onNext(): void {
    if (this.tempStoredVisitors.length > 0) {
      this.tempStoredVisitors.forEach(visitor => {
        this.registerGuestService.saveRegistration(visitor).subscribe({
          next: (response) => console.log('Registration successful:', response),
          error: (error) => console.error('Error during registration:', error),
        });
      });

      // Send approval email to the selected employee
      // if (this.selectedEmployee?.empEmail) {
      //   this.registerGuestService.sendApprovalEmail(this.selectedEmployee.empEmail).subscribe(emailResponse => {
      //     console.log('Approval email sent:', emailResponse);
      //   }, emailError => {
      //     console.error('Error sending approval email:', emailError);
      //   });
      // }

      this.tempStoredVisitors = [];
      this.router.navigate(['/identity-capture']);
    } else {
      console.warn('No visitors to save.');
      alert('Please fill out all required fields!')
    }
  }

  
  // ------------------- below code need to implement. commented out temporary. above onNext comment later

  // onNext(): void {
  //   if (this.isFormValid()) {
  //     this.registerGuest.saveRegistration(this.registerData).subscribe(response => {
  //       console.log('Registration successful:', response);
  //       this.router.navigate(['/identity-capture']); // Redirect to ImageUpload page
  //     }, error => {
  //       console.error('Error during registration:', error);
  //     });
  //   } else {
  //     console.warn('Form is not valid. Please fill out all required fields.');
  //     alert("Form is not valid. Please fill out all required fields.")
  //   }
  // }

  //--------------------


  isFormValid(): boolean {
    return !!(
      this.registerData.empName &&
      this.registerData.name &&
      this.registerData.companyName &&
      this.registerData.purposeToVisit &&
      this.registerData.contact &&
      this.registerData.email &&
      this.registerData.photo 
      // this.registerData.idPhoto
    );
  }

  public onSubmit(): void{
    console.log("ok");
  }

  closeRegistrationForm(){
      this.router.navigate(['/']);
    }

   
  }
