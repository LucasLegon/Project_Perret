import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-tuto3',
  templateUrl: './tuto3.component.html',
  styleUrls: ['./tuto3.component.css']
})
export class Tuto3Component implements OnInit {

  constructor(private location: Location) { }

  ngOnInit() {
  }
  
  goBack(): void {
        this.location.back();
  }
}