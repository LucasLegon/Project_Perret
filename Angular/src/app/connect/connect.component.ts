import { Component, OnInit } from '@angular/core';
import { AppGlobals } from '../macId';

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
        var macId = getMacId();
        if(!macId){
            alert("Veuillez rentrer un identifiant MAC valide");
        }
        
        else{
            this.global.setMacId(macId);
            window.close();
        }
    }
}

// Fonction qui nous renvoie le MAC ID
function getMacId(){
    return (parseInt((<HTMLInputElement>document.getElementById("Mac_ID")).value,10));
}