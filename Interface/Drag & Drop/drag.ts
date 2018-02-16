var cartArea = document.querySelector('#cartArea'); 
 
var prods = document.querySelectorAll('.fonct');
for(var i = 0; i < prods.length; i++)
{
	prods[i].setAttribute('draggable', 'true');  // optional with images
	prods[i].addEventListener('dragstart', function(evnt) {
		this.className = 'itemchoosen';
		evnt.dataTransfer.effectAllowed = 'copy';
		evnt.dataTransfer.setData('text', this.id);
		return false;  
	}, false);
}	


//dragover : Lorsque la souris passe au dessus d'une cible
cartArea.addEventListener('dragover', function(evnt) {
		if (evnt.preventDefault) evnt.preventDefault();
		evnt.dataTransfer.dropEffect = 'copy';
		return false;	
}, false);


//dragenter : Lorsqu'un "objet" rentre dans une cible
cartArea.addEventListener('dragenter', function(evnt) {
		return false;	
}, false);


//dragleave : Lorsqu'on lâche un "objet" que l'on déplace
cartArea.addEventListener('dragleave', function(evnt) {
		return false;
}, false);


//Traitement lorsque qu'un "objet" est déplacé dans une cible
cartArea.addEventListener('drop', function(evnt) {
	if (evnt.stopPropagation) evnt.stopPropagation();
	var id = evnt.dataTransfer.getData('text');		
	var theitem = document.getElementById(id);	
	//theitem.parentNode.removeChild(el);	
	theitem.className='itemblurred';
	var y  = document.createElement('img');
	y.src = theitem.src;
	cartArea.appendChild(y);
	evnt.preventDefault(); // for Firefox
	return false;
}, false);