import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-tuto1',
  templateUrl: './tuto1.component.html',
  styleUrls: ['./tuto1.component.css']
})
export class Tuto1Component implements OnInit {

  constructor(private location: Location) { }

  ngOnInit() {
  }
  
  goBack(): void {
        this.location.back();
  }

}
