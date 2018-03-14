import { Component, OnInit } from '@angular/core';
import { AppGlobals } from '../macId';
import { of } from 'rxjs/observable/of';
import { sendEtage, playEtage, tableauCouleur, tableauId } from '../utils';
import * as mqtt from 'mqtt';


@Component({
  selector: 'app-connect',
  templateUrl: './connect.component.html',
  styleUrls: ['./connect.component.css']
})
export class ConnectComponent implements OnInit {

  inputMacId: number;
  macID: number;

  constructor(private global:AppGlobals) { }

  ngOnInit() {
  }


    goConnect(){
      //alert(this.inputMacId);

      if (this.inputMacId) {
          this.global.macID = of(this.inputMacId);
          window.close();
      } else {
        alert("Veuillez rentrer un identifiant MAC valide");
      }
    }
}
