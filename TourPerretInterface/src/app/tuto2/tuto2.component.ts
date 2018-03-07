import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-tuto2',
  templateUrl: './tuto2.component.html',
  styleUrls: ['./tuto2.component.css']
})
export class Tuto2Component implements OnInit {

  constructor(private location: Location) { }

  ngOnInit() {
  }
  
  goBack(): void {
        this.location.back();
  }
}
