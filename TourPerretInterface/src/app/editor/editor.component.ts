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
                    if((draggedElement.parentNode.parentNode.id!=="fonction")&&(draggedElement.parentNode.id!=="teinte")){
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
 
     goSend(): void {
        // SI C'EST LA PREMIERE FOIS
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
         
         var mqtt = require('mqtt');
        var client =mqtt.connect('mqtt://fde52271:0b9c06301e82918f@broker.shiftr.io', {clientId:'Cla'});
        
        client.publish("121212/ACK","1");
        client.publish("121212/Etage1", message_etage1);
        client.publish("121212/Etage2", message_etage2);
        client.publish("121212/Etage3", message_etage3);
        client.publish("121212/ACK","0");
        
        alert('Message envoyé'); 
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
    putRose(): void {
        document.getElementById("couleur_piece").setAttribute("style", "fill:#F04E98;fill-opacity:1");
    }
  
    putMarron(): void {
        document.getElementById("couleur_piece").setAttribute("style", "fill:#784311;fill-opacity:1");
    }
  
    putOrange(): void {
        document.getElementById("couleur_piece").setAttribute("style", "fill:#ffa600;fill-opacity:1");

    }
  
    putVert(): void {
        document.getElementById("couleur_piece").setAttribute("style", "fill:#00ff04;fill-opacity:1");

    }
  
    putBlanc(): void {
        document.getElementById("couleur_piece").setAttribute("style", "fill:#ffffff;fill-opacity:1");

    }
  
    putRouge(): void {
        document.getElementById("couleur_piece").setAttribute("style", "fill:#ff002a;fill-opacity:1");

    }
  
    putJaune(): void {
        document.getElementById("couleur_piece").setAttribute("style", "fill:#fff700;fill-opacity:1");

    }

    putBleu(): void {
        document.getElementById("couleur_piece").setAttribute("style", "fill:#0400ff;fill-opacity:1");

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
        var tab_len = tab.length;
        var i = 0;
        playTour(etage,tab,tab_len,i,1000);
    }
}


// Fonction retournant un tableau de couleurs
function tableauCouleur(id_etage : string) {
    var elmt = document.getElementById(id_etage).getElementsByClassName("couleur_piece"), elmt_Len = elmt.length;
    var tab_color = new Array(elmt_Len);   // Déclaration du tableau de couleurs

    for (var i = 0; i < elmt_Len; i++) {   // Récupération des pièces de couleurs
        var style = elmt[i].getAttribute("style").substring(5,12);   
        console.log("couleur avant conversion %s",style);
        tab_color[i]=hexToRGB(style); // Mise à jour du tableau avec les styles de couleurs (Par exemple "rgb(25,255,255)"
        console.log("couleur après conversion %s",tab_color[i]);
    }
        
    return tab_color;   // Retour du tableau
}

function hexToRGB(hex){
    var r = hexToR(hex);
    var g = hexToG(hex);
    var b = hexToB(hex);
    var rgb="rgb("+r+", "+g+", "+b+")";
    return rgb;
}

function hexToR(h) {return parseInt((cutHex(h)).substring(0,2),16)}
function hexToG(h) {return parseInt((cutHex(h)).substring(2,4),16)}
function hexToB(h) {return parseInt((cutHex(h)).substring(4,6),16)}
function cutHex(h) {return (h.charAt(0)=="#") ? h.substring(1,7):h}

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
        for (var i = 0; i < tab_id_len; i++) {
            if(tab_id[i]==="Allumer"){
                tab_eta[i]=new Piece(tab_color_top[k],"Allumer");
                k++;
            }
            
            else if(tab_id[i]==="Eteindre"){
                tab_eta[i]=new Piece("silver","Eteindre");
            }
            
            else if(tab_id[i]==="Degrader"){
                tab_eta[i]=new Piece(tab_color_top[k],"Degrader");
                k++;
            }
            
            else if(tab_id[i]==="Clignoter"){
                tab_eta[i]=new Piece(tab_color_top[k],"Clignoter");
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
            degraderTour(etage,tab_etage[i]);            
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
    etage.style.backgroundColor = piece.getStyle(); // Allumage de l'étage avec le style de la fonction
}


// Fonction appelé lorsque nous avons une piece DEGRADER
function degraderTour(etage,piece){
    etage.className='classname';
}


// Fonction appelé lorsque nous avons une piece CLIGNOTER
function clignoterTour(etage,piece,nb_cligno,tempo){
    if(nb_cligno === 0){
        return 0;
    }

    else{
        var style = getComputedStyle(etage,null).backgroundColor; // Récupération de la couleur des pièces_couleurs
        console.log("couleur de clignotement %s",piece.getStyle());

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



// Fonction qui créé la chaine de caractère que nous allons envoyer sur le serveur MQTT. Un protocole a été défini pour coder cette chaine et la décoder facilement
function creerChaineProtocole(tab_etage,tab_etage_len,tempo){
    //Protocole :
    //  T=Temporisation
    //  L=Allumer
    //  O=Eteindre
    //  R=Degrader, S=Degrader deuxième couleur
    //  P=Clignoter
    //  W=Fin
    
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
                chaine = chaine+"O"+"000000";
            }

            else if(tab_etage[i].getId()==="Degrader"){
                chaine = chaine+"R"+rgbToHex(tab_etage[i].getStyle())+"S"+rgbToHex(tab_etage[i].getStyleDegra());           
            }

            else if(tab_etage[i].getId()==="Clignoter"){
                chaine = chaine+"P"+rgbToHex(tab_etage[i].getStyle()); 
            }
        }
    }
    chaine = chaine+"W" // Fin de la chaine
    return chaine;
}



// Fonction qui convertie une couleur RGB en HEXA. Utilisée dans la fonction creerChaineProtocole
function rgbToHex(style) {
    var stylergb = style.slice(4,-1).split(',');

    var tab_rgb = [parseInt(stylergb[0],10),parseInt(stylergb[1],10),parseInt(stylergb[2],10)];
    return ((1 << 24) + (tab_rgb[0] << 16) + (tab_rgb[1] << 8) + tab_rgb[2]).toString(16).slice(1);
}







function open_infos() {
    var width = 500;
    var height = 300;
    if(window.innerWidth){
        var left = (window.innerWidth-width)/2;
        var top = (window.innerHeight-height)/2;
    }
    else
    {
        var left = (document.body.clientWidth-width)/2;
        var top = (document.body.clientHeight-height)/2;
    }
    window.open('/connect','nom_de_ma_popup','menubar=no, scrollbars=no, top='+top+', left='+left+', width='+width+', height='+height+'');
}