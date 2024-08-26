import { Component, OnInit } from '@angular/core';
import { HomeService, PreApprovedVisitor } from '../services/home.service';
import { Router } from '@angular/router';

@Component({
  selector: 'gate-pass',
  templateUrl: './gate-pass.component.html',
  styleUrls: ['./gate-pass.component.css']
})
export class GatePassComponent implements OnInit {

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

  onGeneratePass(){
    this.router.navigate(['/temp-pass']);
  }
}
