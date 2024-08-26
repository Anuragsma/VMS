import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HomeService, PreApprovedVisitor } from '../services/home.service';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

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

  // checkIn(): void {
  //   if (this.selectedVisitor) {
  //     this.router.navigate(['/registration'], { state: { name: this.selectedVisitor.name } });
  //   }
  // }

}

