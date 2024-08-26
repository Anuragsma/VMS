
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'VMSystem';
  constructor(private router: Router) {}

  // onCheckin() {
  //   this.router.navigate(['/registration']);
  // }
}
