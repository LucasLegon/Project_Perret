import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {

  constructor(private location: Location) { }

  ngOnInit() {
  }
  
  goBack(): void {
    this.location.back();
  }
  
  goNew(): void {
    alert('Création d\'un nouveau document');
  }
  goSave(): void {
    alert('Travail enregistré');
  }
  goUndo(): void {
    alert('Retour arrière');  
  }
  
  
}