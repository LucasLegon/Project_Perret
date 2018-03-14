import { Component, OnInit } from '@angular/core';
import { AppGlobals } from '../macId';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

@Component({
  selector: 'app-connect',
  templateUrl: './connect.component.html',
  styleUrls: ['./connect.component.css']
})
export class ConnectComponent implements OnInit {

  constructor(public global:AppGlobals) { }

  ngOnInit() {
  }

    goConnect(){
        var data = getMacId();
        if(!data){
            alert("Veuillez rentrer un identifiant MAC valide");
        }
        
        else{
            this.global.macID = of(data);
            window.close();
        }
    }
}

// Fonction qui nous renvoie le MAC ID
function getMacId(){
    return (parseInt((<HTMLInputElement>document.getElementById("Mac_ID")).value,10));
}