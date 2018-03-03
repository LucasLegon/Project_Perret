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

    Allumer = new Piece(25,255,255);
    
    Eteindre = new Piece(255,255,255);

    Degrader = new Piece(255,255,255);

    Clignoter = new Piece(255,255,255);
    
    Couleur = new Piece(255,255,255);



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
    
        // ETAGE 3 //
        var etage3 = document.getElementById("color_etage3");
        
        // TABLEAU DE COULEURS TOP //
        var tab_color_top_eta3 = new Array();
        tab_color_top_eta3=tableauCouleur("etage3_top");
        var tab_color_top_eta3_len = tab_color_top_eta3.length;

        // TABLEAU DE FONCTIONS //
        var tab_id_eta3 = new Array();
        tab_id_eta3 = tableauId("etage3_middle");

        // ALLUMAGE DE LA TOUR //
        var i = 0;
        allumerTour(etage3,tab_color_top_eta3,tab_color_top_eta3_len,i);
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



         ///////////////////////////////
        // Déclaration des fonctions //
       ///////////////////////////////

// Fonction retournant un tableau de pièces de couleurs
function tableauCouleur(id_etage : string) {
    var elmt = document.getElementById(id_etage).getElementsByClassName("piece_color"), elmt_Len = elmt.length;
    var tab_color = new Array(elmt_Len);   // Déclaration du tableau de couleurs

    for (var i = 0; i < elmt_Len; i++) {   // Récupération des pièces de couleurs
        var style = getComputedStyle(elmt[i],null).backgroundColor; // Récupération de la couleur des pièces_couleurs
//        var rgb = style.slice(4,-1).split(',');   // Extraction des niveaux de rouge/vert/bleu
//        tab_color[i] = new Piece(Number(rgb[0]),Number(rgb[1]),Number(rgb[2]));
        tab_color[i]=style;
    }
        
    return tab_color;   // Retour du tableau
}


// Fonction retournant un tableau des  IDs des pièces fonctions
function tableauId(id_etage : string) {
    var elmt = document.getElementById(id_etage).getElementsByClassName("fonct"), elmt_Len = elmt.length;
    var tab_id = new Array(elmt_Len);   // Déclaration du tableau d'IDs

    for (var i = 0; i < elmt_Len; i++) {   // Récupération des pièces fonctions
        console.log("   Id : %s",elmt[i].id);
        tab_id[i] = elmt[i].id; // Récupération de l'ID des pièces
    }
        
    return tab_id;   // Retour du tableau
}


// Fonction allumant les étages de la tour passés en paramètres
function allumerTour(etage,tab_etage,tab_etage_len,i) {
    if(i==tab_etage_len) {
        return 0;
    }
    
    else {
       // var rouge = tab_etage[i].m_red;
      //  var vert = tab_etage[i].m_green;
      //  var bleu = tab_etage[i].m_blue;
        //etage.style.backgroundColor = "rgb(tab_etage[i].m_red,tab_etage[i].m_green,tab_etage[i].m_blue)";
      //  etage.style.backgroundColor = "rgb(rouge,25,25)";
     //   console.log("   ROUGE §§§§ : %d",tab_etage[i].m_red);
     //   console.log("   ROUGE §§§§ : %d",tab_etage[i].m_green);
     //   console.log("   ROUGE §§§§ : %d",tab_etage[i].m_blue);
     
        console.log("   STYLE § : %s",tab_etage[i]);
        etage.style.backgroundColor = tab_etage[i];
        i=i+1;
        setTimeout(allumerTour, 1000,etage,tab_etage,tab_etage_len,i); // On rappelle la fonction allumerTour avec la temporisation en milisecondes
    }
}