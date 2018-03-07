import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Piece } from './piece';
import * as myGlobals from './globals';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})




export class EditorComponent implements OnInit {

         ////////////////////////////////////////
        // Déclaration des différentes pièces //
       ////////////////////////////////////////


  constructor(private location: Location) { }

  ngOnInit() {
        myGlobals.setIndiceLetter(0);
        
        
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
        
        alert('Message envoyé'); 
    }
  
    goUndo(): void {
        alert('Retour arrière');  
    }

 
// Lecture
    start() : void {
    
        // ETAGE 3 //
        var etage1 = document.getElementById("color_etage1");
        var etage2 = document.getElementById("color_etage2");
        var etage3 = document.getElementById("color_etage3");
        
        playEtage(etage1,"etage1_down","etage1_middle","etage1_top");
        playEtage(etage2,"etage2_down","etage2_middle","etage2_top");
        playEtage(etage3,"etage3_down","etage3_middle","etage3_top");
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



function sendEtage(etage,down,middle,top){

    // Initialisation de l'éclairage //
    etage.style.backgroundColor = "silver";
    
    // TABLEAU DE COULEURS TOP //
    var tab_color_top = new Array();
    tab_color_top = tableauCouleur(top);
    var tab_color_top_len = tab_color_top.length;
    
    // TABLEAU DE COULEURS DOWN //
    var tab_color_down = new Array();
    tab_color_down = tableauCouleur(down);
    var tab_color_down_len = tab_color_down.length;
    
    // TABLEAU DES IDs DES FONCTIONS //
    var tab_id = new Array();
    tab_id = tableauId(middle);
    var tab_id_len = tab_id.length;
    
    // TABLEAU DES PIECES FONCTIONS //
    var tab = new Array();
    tab = tableauPiece(tab_id,tab_id_len,tab_color_top,tab_color_top_len,tab_color_down,tab_color_down_len);
    if(tab==null){
        alert('Il y a une erreur dans ta programmation');
    }
    else{
        // CREATION DE LA CHAINE //
        var tempo = getTempo()*1000;    // Récupération de la durée des pièces
        var tab_len = tab.length;
        var chaine = creerChaineProtocole(tab,tab_len,tempo);
        return chaine;
    }
}



















// Fonction principale faisant le traitement pour un étage passé en paramètre
function playEtage(etage,down,middle,top){

    // Initialisation de l'éclairage //
    etage.style.backgroundColor = "silver";
    
    // TABLEAU DE COULEURS TOP //
    var tab_color_top = new Array();
    tab_color_top = tableauCouleur(top);
    var tab_color_top_len = tab_color_top.length;
    
    // TABLEAU DE COULEURS DOWN //
    var tab_color_down = new Array();
    tab_color_down = tableauCouleur(down);
    var tab_color_down_len = tab_color_down.length;
    
    // TABLEAU DES IDs DES FONCTIONS //
    var tab_id = new Array();
    tab_id = tableauId(middle);
    var tab_id_len = tab_id.length;
    
    // TABLEAU DES PIECES FONCTIONS //
    var tab = new Array();
    tab = tableauPiece(tab_id,tab_id_len,tab_color_top,tab_color_top_len,tab_color_down,tab_color_down_len);
    if(tab==null){
        alert('Il y a une erreur dans ta programmation');
    }
    else{
        // ALLUMAGE DE LA TOUR //
        var tempo = getTempo()*1000;    // Récupération de la durée des pièces
        var tab_len = tab.length;
        var i = 0;
        playTour(etage,tab,tab_len,i,tempo);
    }
}


// Fonction retournant un tableau de couleurs
function tableauCouleur(id_etage : string) {
    var elmt = document.getElementById(id_etage).getElementsByClassName("piece_color"), elmt_Len = elmt.length;
    var tab_color = new Array(elmt_Len);   // Déclaration du tableau de couleurs

    for (var i = 0; i < elmt_Len; i++) {   // Récupération des pièces de couleurs
        var style = getComputedStyle(elmt[i],null).backgroundColor; // Récupération de la couleur des pièces_couleurs
        tab_color[i]=style; // Mise à jour du tableau avec les styles de couleurs (Par exemple "rgb(25,255,255)"
    }
        
    return tab_color;   // Retour du tableau
}


// Fonction retournant un tableau des  IDs des pièces fonctions
function tableauId(id_etage : string) {
    var elmt = document.getElementById(id_etage).getElementsByClassName("fonct"), elmt_Len = elmt.length;
    var tab_id = new Array(elmt_Len);   // Déclaration du tableau d'IDs

    for (var i = 0; i < elmt_Len; i++) {   // Récupération des pièces fonctions
        tab_id[i] = elmt[i].id; // Récupération de l'ID des pièces
    }
        
    return tab_id;   // Retour du tableau
}


// Fonction retournant le tableau des pièces fonctions avec Style et Id
function tableauPiece(tab_id, tab_id_len, tab_color_top, tab_color_top_len,tab_color_down, tab_color_down_len)
{
    // Vérification du bon nombre de pièces couleurs
    var nb_piece = 0;
    var nb_piece_double = 0;
    for (var i = 0; i < tab_id_len; i++) {
        if(tab_id[i]!=="Eteindre"){
            nb_piece++;
        }
        
        if(tab_id[i]==="Degrader"){
            nb_piece_double++;
        }
    }
    if((nb_piece!==tab_color_top_len)||(nb_piece_double!==tab_color_down_len)){
        console.log("ERROR");
        return null;
    }
    
    else
    {
        var tab_eta = new Array(tab_id_len);
        var k=0;
        var l=0;
        for (var i = 0; i < tab_id_len; i++) {
            if(tab_id[i]==="Allumer"){
                tab_eta[i]=new Piece(tab_color_top[k],"null","Allumer");
                k++;
            }
            
            else if(tab_id[i]==="Eteindre"){
                tab_eta[i]=new Piece("silver","null","Eteindre");
            }
            
            else if(tab_id[i]==="Degrader"){
                tab_eta[i]=new Piece(tab_color_top[k],tab_color_down[l],"Degrader");
                k++;
                l++;
            }
            
            else if(tab_id[i]==="Clignoter"){
                tab_eta[i]=new Piece(tab_color_top[k],"null","Clignoter");
                k++;
            }
        }
        
        return tab_eta;
    }
}


// Fonction allumant les étages de la tour passés en paramètres
function playTour(etage,tab_etage,tab_etage_len,i,tempo) {
    if(i==tab_etage_len) {
        return 0;
    }
    
    else {
        if(tab_etage[i].getId()==="Allumer"){
            allumerTour(etage,tab_etage[i]);
        }

        else if(tab_etage[i].getId()==="Eteindre"){
            allumerTour(etage,tab_etage[i]);
        }

        else if(tab_etage[i].getId()==="Degrader"){
            degraderTour(etage,tab_etage[i],120,6*tempo/1000);            
        }

        else if(tab_etage[i].getId()==="Clignoter"){
            var nb_clignotement = 5;
            var tempo_cligno = tempo/nb_clignotement;
            clignoterTour(etage,tab_etage[i],nb_clignotement,tempo_cligno);
        }
        
        i++;
        setTimeout(playTour, tempo,etage,tab_etage,tab_etage_len,i,tempo); // On rappelle la fonction allumerTour avec la temporisation en milisecondes
    }
}


// Fonction appelé lorsque nous avons une piece ALLUMER et ETEINDRE
function allumerTour(etage,piece){
    console.log("%s",piece.getId());
    etage.style.backgroundColor = piece.getStyle(); // Allumage de l'étage avec le style de la fonction
}


// Fonction appelé lorsque nous avons une piece DEGRADER
function degraderTour(etage,piece,nbTrans,delay){
    console.log("%s",piece.getId());
    var styleTop = piece.getStyle().slice(4,-1).split(','); // Récupérer les couleurs rouge, vert, bleu dans 3 variables différentes
    var styleDown = piece.getStyleDegra().slice(4,-1).split(',');

    var tab_top = [parseInt(styleTop[0],10),parseInt(styleTop[1],10),parseInt(styleTop[2],10)];
    var tab_down = [parseInt(styleDown[0],10),parseInt(styleDown[1],10),parseInt(styleDown[2],10)];
    
    var delay = delay || 100; // en millisecondes c ets le temps qui passe entre chaque execution. a diminuer si la fluidité n est pas au rendez vous
    var nbTrans = nbTrans || 20; // le nombre de transitions...a augmenter si ce n ets pas assez fluide
    var startColor = tab_top || [255,255,255]; // remplacer par les chiffres qui vont bien
    var stopColor = tab_down || [255,255,255]; // pareil
    
    // maintenant il faut calculer le delta de chaque couleur
    var rDelta = Math.floor((stopColor[0]-startColor[0])/nbTrans);
    var gDelta = Math.floor((stopColor[1]-startColor[1])/nbTrans);
    var bDelta = Math.floor((stopColor[2]-startColor[2])/nbTrans);
    
     // on cree les variables ou vont etre stockees les couleurs temporaires
    var rTemp = startColor[0];
    var gTemp = startColor[1];
    var bTemp = startColor[2];
 
    // un petit setInterval pour que la fonction se repete d elle meme
    var interval = setInterval(function() {
        rTemp += rDelta;
        gTemp += gDelta;
        bTemp += bDelta;
        etage.style.backgroundColor = "rgb("+rTemp+","+gTemp+","+bTemp+" )";
        if (rTemp<0 || gTemp<0 || bTemp<0|| rTemp>255 || gTemp>255 || bTemp>255 ) {
            clearInterval(interval);
            etage.style.backgroundColor = "rgb("+stopColor[0]+","+stopColor[1]+","+stopColor[2]+" )";
        }
    },delay);
}


// Fonction appelé lorsque nous avons une piece CLIGNOTER
function clignoterTour(etage,piece,nb_cligno,tempo){
    console.log("%s",piece.getId());
    if(nb_cligno === 0){
        return 0;
    }

    else{
        var style = getComputedStyle(etage,null).backgroundColor; // Récupération de la couleur des pièces_couleurs
        if(style == piece.getStyle()){
             etage.style.backgroundColor = "silver";
        }
        
        else{
            etage.style.backgroundColor = piece.getStyle();
        }
        
        nb_cligno--;
        setTimeout(clignoterTour, tempo,etage,piece,nb_cligno,tempo);
    }
}

// Fonction qui nous renvoie la durée que dois avoir les pièces, en secondes
function getTempo(){
    return (parseFloat((<HTMLInputElement>document.getElementById("duree_input")).value));
}








function creerChaineProtocole(tab_etage,tab_etage_len,tempo){
    //Protocole :
    //  T=Temporisation
    //  L=Allumer
    //  O=Eteindre
    //  R=Degrader
    //  P=Clignoter
    
    var chaine;
    if(tab_etage_len===0)
    {
        chaine = "null";
    }
    
    else {
        chaine = "T"+tempo;
        for (var i = 0; i < tab_etage_len; i++){
            if(tab_etage[i].getId()==="Allumer"){
                chaine = chaine+"L"+rgbToHex(tab_etage[i].getStyle());
            }

            else if(tab_etage[i].getId()==="Eteindre"){
                chaine = chaine+"O"+rgbToHex(tab_etage[i].getStyle());
            }

            else if(tab_etage[i].getId()==="Degrader"){
                chaine = chaine+"R"+rgbToHex(tab_etage[i].getStyle())+rgbToHex(tab_etage[i].getStyleDegra());           
            }

            else if(tab_etage[i].getId()==="Clignoter"){
                chaine = chaine+"P"+rgbToHex(tab_etage[i].getStyle()); 
            }
        }
    }
    
    return chaine;
}


function rgbToHex(style) {
    var stylergb = style.slice(4,-1).split(',');

    var tab_rgb = [parseInt(stylergb[0],10),parseInt(stylergb[1],10),parseInt(stylergb[2],10)];
    return ((1 << 24) + (tab_rgb[0] << 16) + (tab_rgb[1] << 8) + tab_rgb[2]).toString(16).slice(1);
}