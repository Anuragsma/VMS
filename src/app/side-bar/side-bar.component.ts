import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { HomeService, PreApprovedVisitor } from '../services/home.service';
import { RegistrationComponent } from '../registration/registration.component';

@Component({
  selector: 'side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {
  // @ViewChild(RegistrationComponent) registrationComponent!: RegistrationComponent;
  
  constructor(private router: Router) { }

  // onCheckin() {
  //   // this.router.navigate(['/confirmation-page']);
  //   // this.router.navigate(['/registration']);
  // }

  ngOnInit(): void {
    
  }

  onHomePage() : void{
    this.router.navigate(['/home']);
  }

  onCheckin(): void {
      this.router.navigate(['/registration']);
  }

  newRegister(): void{
    this.router.navigate(['/registration'] , { queryParams: { reset: true } });
    
  }

  onGatePass(): void{
    this.router.navigate(['/gate-pass']);
  }

  onCheckout() {
    this.router.navigate(['/checkout']);
  }

  // ngOnInit(): void {
  // }
  // ngOnInit(): void {
  //   this.resetForm(); // Call the reset function when the component initializes
  //   // Other initialization code...
  // }
  
  // resetForm(): void {
  //   this.registerData = {
  //     empName: '',
  //     name: '',
  //     companyName: '',
  //     purposeToVisit: '',
  //     contact: '',
  //     email: '',
  //   };
  // }
  

}
