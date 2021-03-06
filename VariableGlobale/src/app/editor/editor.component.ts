import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Piece } from './piece';
import * as myGlobals from './globals';
import { AppGlobals } from '../macId';
import * as mqtt from 'mqtt';
import { open_infos, sendEtage, playEtage, tableauCouleur, tableauId, barreMove } from '../utils';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})




export class EditorComponent implements OnInit {

         ////////////////////////////////////////
        // Déclaration des différentes pièces //
       ////////////////////////////////////////


  constructor(private location: Location, private global : AppGlobals) { }

  ngOnInit() {
        myGlobals.setIndiceLetter(0);
        myGlobals.setStop(false);

        /////////////////
        // DRAG & DROP //
       /////////////////

       var dndHandler = {

        draggedElement: null, // Propriété pointant vers l'élément en cours de déplacement

        applyDragEvents: function(element) {

            element.draggable = true;

            var dndHandler = this; // Cette variable est nécessaire pour que l'événement « dragstart » ci-dessous accède facilement au namespace « dndHandler »

            element.addEventListener('dragstart', function(e) {
                dndHandler.draggedElement = e.target; // On sauvegarde l'élément en cours de déplacement
                e.dataTransfer.setData('text/plain', ''); // Nécessaire pour Firefox
            });

        },

        applyDropEvents: function(dropper) {

            if(dropper.className!=="poubelle"){
                dropper.addEventListener('dragover', function(e) {
                    e.preventDefault(); // On autorise le drop d'éléments
                    this.className = 'zone zone_hover'; // Et on applique le style adéquat à notre zone de drop quand un élément la survole
                });

                dropper.addEventListener('dragleave', function() {
                    this.className = 'zone'; // On revient au style de base lorsque l'élément quitte la zone de drop
                });

                var dndHandler = this; // Cette variable est nécessaire pour que l'événement « drop » ci-dessous accède facilement au namespace « dndHandler »

                dropper.addEventListener('drop', function(e) {

                    var target = e.target,
                        draggedElement = dndHandler.draggedElement, // Récupération de l'élément concerné
                        clonedElement = draggedElement.cloneNode(true); // On créé immédiatement le clone de cet élément
                    while (target.className.indexOf('zone') == -1) { // Cette boucle permet de remonter jusqu'à la zone de drop parente
                        target = target.parentNode;
                    }

                    target.className = 'zone'; // Application du style par défaut

                    clonedElement = target.appendChild(clonedElement); // Ajout de l'élément cloné à la zone de drop actuelle
                    dndHandler.applyDragEvents(clonedElement); // Nouvelle application des événements qui ont été perdus lors du cloneNode()
                    if((draggedElement.parentNode.parentNode.id!=="piece_fonction")&&(draggedElement.parentNode.id!=="teinte")){
                        draggedElement.parentNode.removeChild(draggedElement); // Suppression de l'élément
                    }
                });
            }

            else if(dropper.className=="poubelle")
            {
                dropper.addEventListener('dragover', function(e) {
                    e.preventDefault(); // On autorise le drop d'éléments
                    this.className = 'poubelle poubelle_hover'; // Et on applique le style adéquat à notre zone de drop quand un élément la survole
                });

                dropper.addEventListener('dragleave', function() {
                    this.className = 'poubelle'; // On revient au style de base lorsque l'élément quitte la zone de drop
                });

                var dndHandler = this; // Cette variable est nécessaire pour que l'événement « drop » ci-dessous accède facilement au namespace « dndHandler »

                dropper.addEventListener('drop', function(e) {

                    var target = e.target,
                        draggedElement = dndHandler.draggedElement;
                    while (target.className.indexOf('poubelle') == -1) { // Cette boucle permet de remonter jusqu'à la zone de drop parente
                        target = target.parentNode;
                    }

                    target.className = 'poubelle'; // Application du style par défaut
                    if((draggedElement.parentNode.parentNode.id!=="fonction")&&(draggedElement.parentNode.id!=="teinte")){
                        draggedElement.parentNode.removeChild(draggedElement); // Suppression de l'élément
                    }
                });
            }
        }

    };

    var elements = document.querySelectorAll('.fonct'),
        elementsLen = elements.length;

    for (var i = 0; i < elementsLen; i++) {
        dndHandler.applyDragEvents(elements[i]); // Application des paramètres nécessaires aux éléments déplaçables
    }

    var droppers = document.querySelectorAll('.zone'),
        droppersLen = droppers.length;

    for (var i = 0; i < droppersLen; i++) {
        dndHandler.applyDropEvents(droppers[i]); // Application des événements nécessaires aux zones de drop
    }

    var poubelle = document.querySelector('.poubelle');
    dndHandler.applyDropEvents(poubelle);
  }



         ///////////////////////
        // Actions aux clics //
       ///////////////////////

// Orientation TOUR

    goLeft(): void{
        myGlobals.setIndiceLetter(myGlobals.indice_letter-1);
        if(myGlobals.indice_letter==-1){
            myGlobals.setIndiceLetter(3);
        }
        var div = document.getElementById('orientation');
        div.innerHTML=myGlobals.orientation_letter[myGlobals.indice_letter];
    }

    goRight(): void{
        myGlobals.setIndiceLetter(myGlobals.indice_letter+1);
        if(myGlobals.indice_letter==4){
            myGlobals.setIndiceLetter(0);
        }
        var div = document.getElementById('orientation');
        div.innerHTML=myGlobals.orientation_letter[myGlobals.indice_letter];
    }

// Accueil
    goBack(): void {
        this.location.back();
    }

    goNew(): void {
        alert('Création d\'un nouveau document');
    }

    goSave(): void {
        alert('Travail enregistré');
    }

    goSend(): void {
        // SI C'EST LA PREMIERE FOIS
        this.global.macID.subscribe((macID) => {
          alert(macID);
          if(!macID){
              open_infos();
          }

          var etage1 = document.getElementById("color_etage1");
         var etage2 = document.getElementById("color_etage2");
          var etage3 = document.getElementById("color_etage3");

          //Protocole :
          //  X=Etage 1
          //  Y=Etage 2
          //  Z=Etage 3

          var message_etage1 = "X"+sendEtage(etage1,"etage1_down","etage1_middle","etage1_top");
          var message_etage2 = "Y"+sendEtage(etage2,"etage2_down","etage2_middle","etage2_top");
          var message_etage3 = "Z"+sendEtage(etage3,"etage3_down","etage3_middle","etage3_top");
          console.log("Etage 1 : %s",message_etage1);
          console.log("Etage 2 : %s",message_etage2);
          console.log("Etage 3 : %s",message_etage3);


          var client =mqtt.connect('mqtt://fde52271:0b9c06301e82918f@broker.shiftr.io', {clientId:'Cla'});

          client.publish(macID+"/ACK","1");
          client.publish(macID+"/Etage1", message_etage1);
          client.publish(macID+"/Etage2", message_etage2);
          client.publish(macID+"/Etage3", message_etage3);
          client.publish(macID+"/ACK","0");

          alert('Message envoyé');

      });
    }

    goUndo(): void {
        alert('Retour arrière');
    }


// Lecture
    start() : void {
        myGlobals.setStop(false);

        // SELECTION ETAGE //
        var etage1 = document.getElementById("color_etage1");
        var etage2 = document.getElementById("color_etage2");
        var etage3 = document.getElementById("color_etage3");

        // FONCTION PRINCIPALE playEtage() //
        playEtage(etage1,"etage1_down","etage1_middle","etage1_top");
        playEtage(etage2,"etage2_down","etage2_middle","etage2_top");
        playEtage(etage3,"etage3_down","etage3_middle","etage3_top");

        // Réinitialisation de la barre de temps //
        var barre = document.getElementById("barre_temps");
        barre.style.opacity = '1';
        barre.style.left = '41px';
        barreMove(barre);
    }




    stop() : void {
        myGlobals.setStop(true);
        var etage1 = document.getElementById("color_etage1");
        var etage2 = document.getElementById("color_etage2");
        var etage3 = document.getElementById("color_etage3");

        // Eteindre la tour //
        etage1.style.backgroundColor = "silver";
        etage2.style.backgroundColor = "silver";
        etage3.style.backgroundColor = "silver";

        // Réinitialisation de la barre de temps //
        var barre = document.getElementById("barre_temps");
        barre.style.left = '41px';
        barre.style.opacity = '0';
    }




// Couleur
    putNoir(): void {
        var divColor = document.getElementById("fond_piece_color");

        divColor.style.backgroundColor = "black";
    }

    putMarron(): void {
        var divColor = document.getElementById("fond_piece_color");

        divColor.style.backgroundColor = "maroon";
    }

    putOrange(): void {
        var divColor = document.getElementById("fond_piece_color");

        divColor.style.backgroundColor = "orange";
    }

    putVert(): void {
        var divColor = document.getElementById("fond_piece_color");

        divColor.style.backgroundColor = "green";
    }

    putBlanc(): void {
        var divColor = document.getElementById("fond_piece_color");

        divColor.style.backgroundColor = "white";
    }

    putRouge(): void {
        var divColor = document.getElementById("fond_piece_color");

        divColor.style.backgroundColor = "red";
    }

    putJaune(): void {
        var divColor = document.getElementById("fond_piece_color");

        divColor.style.backgroundColor = "yellow";
    }

    putBleu(): void {
        var divColor = document.getElementById("fond_piece_color");

        divColor.style.backgroundColor = "blue";
    }

}
