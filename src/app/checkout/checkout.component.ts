import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WebcamImage } from 'ngx-webcam';
import { Subject } from 'rxjs';
import { HomeService, PreApprovedVisitor } from '../services/home.service';

@Component({
  selector: 'checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  preApprovedVisitors: PreApprovedVisitor[] = [];
  selectedVisitor?: PreApprovedVisitor;

  constructor(private homeService: HomeService, private router: Router) { }

  ngOnInit(): void {
    this.homeService.getPreApprovedVisitors().subscribe(data => {
      this.preApprovedVisitors = data;
    });
  }

  onSelect(event: Event): void {
    const selectElement = event.target as HTMLSelectElement; // Cast to HTMLSelectElement
    const selectedId = Number(selectElement.value); // Get the selected ID
    this.selectedVisitor = this.preApprovedVisitors.find(preApprovedVisitor => preApprovedVisitor.id === selectedId); // Find the selected item
    localStorage.setItem('selectedVisitor', JSON.stringify(this.selectedVisitor));
  }

  onCheckOutFinally(){
    alert("Thanks for coming");
  }

}







