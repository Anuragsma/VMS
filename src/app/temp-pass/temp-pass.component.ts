import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'temp-pass',
  templateUrl: './temp-pass.component.html',
  styleUrls: ['./temp-pass.component.css']
})
export class TempPassComponent implements OnInit {

  constructor(private router: Router) { }

  closeRegistrationForm(){
    this.router.navigate(['/']);
  }

  ngOnInit(): void {
  }

}
