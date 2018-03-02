import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Piece } from './piece';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {

         ////////////////////////////////////////
        // Déclaration des différentes pièces //
       ////////////////////////////////////////

    Allumer : Piece = {
        m_lien : 'assets/ImPNG/Pieces/allumer.png',
        m_red : 25,
        m_green : 255,
        m_blue : 255
    };
    
    Eteindre : Piece = {
        m_lien : 'assets/ImPNG/Pieces/eteindre.png',
        m_red : 255,
        m_green : 255,
        m_blue : 255
    };
    
    Degrader : Piece = {
        m_lien : 'assets/ImPNG/Pieces/degrade.png',
        m_red : 255,
        m_green : 255,
        m_blue : 255
    };
    
    Clignoter : Piece = {
        m_lien : 'assets/ImPNG/Pieces/clignoter.png',
        m_red : 255,
        m_green : 255,
        m_blue : 255
    };
    
    Couleur : Piece = {
        m_lien : 'assets/ImPNG/Pieces/piece_couleur.png',
        m_red : 255,
        m_green : 255,
        m_blue : 255
    };


  constructor(private location: Location) { }

  ngOnInit() {
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

            });

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

  }
  
  
  
         ///////////////////////
        // Actions aux clics //
       ///////////////////////

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
  
    goUndo(): void {
        alert('Retour arrière');  
    }
 
 
// Lecture
    start() : void {
        var etage3 = document.getElementById("color_etage3");
        var elmt3 = document.getElementById("etage3").getElementsByClassName("fonct"), elmt3_Len = elmt3.length;

    for (var i = 0; i < elmt3_Len; i++) {
        console.log("%d : Piece",i);
    }
    
        etage3.style.backgroundColor = "rgb(25,255,255)";
    }
    
    stop() : void {
    
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