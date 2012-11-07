// JavaScript Document
// check for drag and drop support
var iOS = !!navigator.userAgent.match('iPhone OS') || !!navigator.userAgent.match('iPad');
afficherScore();
//nombre piece du puzzle
sessionStorage.setItem("nomprePiece",4);


var widthGlobale = 320;
var heightGlobale = 320;

//on initialisele tableau contenant l'etat des places
for (i=0; i<sessionStorage.getItem("nomprePiece"); i++) {
	sessionStorage.setItem("place"+i,0);
}

afficheMorceauPuzzle(sessionStorage.getItem("nomprePiece"));


//des places dans le puzzle frame
for (i=0; i<sessionStorage.getItem("nomprePiece"); i++) {
	$('#puzzle-frame2').append("<div id=\"place"+i+"\"  ondrop=\"drop(this, event);\" ondragenter=\"return false;\" ondragover=\"return false;\"></div>");
      //redimensionement
}
 //resize();
 
 
function drag(draggableitem, e) {
	e.dataTransfer.setData("Text", draggableitem.id);	
}
function drop(target, e) {
	var id = e.dataTransfer.getData('Text');

	//on recupere dans le local storage la place de depart de la piece
	var placeOfPiece = sessionStorage.getItem(id);
	alert("id "+id+" "+placeOfPiece +" "+target.id);

	//on compare la place de la piece et la place ou elle doit etre deplacée
	if (placeOfPiece==target.id)
	{
		target.appendChild(document.getElementById(id));

		//on indique que cet emplacement est correctement remplit
		sessionStorage.setItem(target.id,1);
	}


	e.preventDefault();
	//on parcourt le local storage de toute les places pour verifier si la partie n'est pas finie
	var estFinie=1;

	for (i=0; i<sessionStorage.getItem("nomprePiece"); i++) {

		//si une place n'est pas occupé la partie est finie
		if (sessionStorage.getItem("place"+i)==0) 
		{
			estFinie=0;
		}

	}
	
	if(estFinie==1)
	{
		partieGagnee();
	}

}

//Function resize
//Redimensionne le puzzle et les pieces en fonction de la taille de l'ecrans
function resize() {
	var largeur=screen.availWidth*0.8;
	document.getElementById('puzzle-frame2').style.height=(largeur)+'px';
	document.getElementById('puzzle-frame2').style.width=(largeur)+'px';
	
	//on redimenssionne les pieces en fonction du nombre de piece
	var indice=2;
	if(sessionStorage.getItem("nomprePiece")==4)
	{
		indice=2;
	} else 	if(sessionStorage.getItem("nomprePiece")==9)
	{
		indice=3;
	} else if(sessionStorage.getItem("nomprePiece")==16)
	{
		indice=4;
	}
	for (i=0; i<sessionStorage.getItem("nomprePiece"); i++) {

		document.getElementById('piece'+i).style.height=(largeur/indice)+'px';
		document.getElementById('piece'+i).style.width=(largeur/indice)+'px';
		document.getElementById('place'+i).style.height=(largeur/indice)+'px';
		document.getElementById('place'+i).style.width=(largeur/indice)+'px';
	}
}

//Function partieGagnee
//Fonction appellée lorsque le puzzle est finie, doit gérer le traitement de fin de partie 
function partieGagnee()
{
	$('body').append("<audio autoplay><source src='"+word['audio']+"' type='audio/ogg'></audio>");
	$("#popupBasic2").popup("open");
}

//Function ajouterAuScore
//Ajoute en nombre passé en parametre au score du joueur
function ajouterAuScore(scoreAAjouter)
{
	//si le score est nul on le met a 0
	if(sessionStorage.getItem("score")==null)
	{
		sessionStorage.setItem("score",0);
	}
	//ajoute le nouveau score au precedent et on le stocke
	var nouveauScore= parseInt(sessionStorage.getItem("score"))+parseInt(scoreAAjouter);
	sessionStorage.setItem("score",nouveauScore);
	
	afficherScore();

}

//Function afficher Score
//Recupere le score et l'insere dans la div "score"
function afficherScore()
{
	//si le score est nul on le met a 0
	if(sessionStorage.getItem("score")==null)
	{
		sessionStorage.setItem("score",0);
	}
	
	//on recupere dans le score et on l'insere dans la div prévue
	$('#score').html(sessionStorage.getItem("score"));
	
}


function liresound (soundFile) { 
 var audio;
 audio = new Audio(soundFile);
 audio.play();
}




function createPuzzle(niveau, url)
{
	// Récupération de l'élément qui va contenir la div

	//var myCtn=document.getElementById("puzzle-frame2");

	myCtn.style.height = heightGlobale + "px";
	myCtn.style.width = widthGlobale + "px";

	var morceauPuzzle = document.createElement('DIV');

	afficheMorceauPuzzle(niveau, url);
}

function afficheMorceauPuzzle(nbrPiece)
{
	var morceauWidth;
	var morceauHeight;

	if(nbrPiece == 4)
	{
		var url = "res/img/animaux/animalPuzzle/animal1.png";
		morceauHeight = heightGlobale / 2;
		morceauWidth = widthGlobale / 2;

		var Myctn=document.getElementById("pieces");

		var monDiv = document.createElement('DIV');
		monDiv.setAttribute("id", "piece0");
		monDiv.className = 'divPuzzle';
		monDiv.innerHTML = "";
		monDiv.style.backgroundImage="url("+url+")";
		monDiv.style.backgroundPosition='0% '+'0%';
		monDiv.style.width = morceauWidth+"px";
		monDiv.style.height = morceauHeight+"px";
		monDiv.style.display = 'inline-block';
		monDiv.style.marginRight = '3px';
		monDiv.style.border = 'solid black 3px';
		monDiv.setAttribute("draggable", "true");
		monDiv.setAttribute("margin-right", "3px");
		sessionStorage.setItem("piece0","place0");
		monDiv.setAttribute("ondragstart","drag(this, event);");

		var monDiv2 = document.createElement('DIV');
		monDiv2.setAttribute("id", "piece1");
		monDiv2.className = 'divPuzzle';
		monDiv2.innerHTML = "";
		monDiv2.style.backgroundImage="url("+url+")";
		monDiv2.style.backgroundPosition='100% '+ '0%';
		monDiv2.style.width = morceauWidth+"px";
		monDiv2.style.height = morceauHeight+"px";
		monDiv2.style.display = 'inline-block';
		monDiv2.style.marginRight = '3px';
		monDiv2.setAttribute("draggable", "true");
		sessionStorage.setItem("piece1","place1");
		monDiv2.setAttribute("ondragstart","drag(this, event);");

		var monDiv3 = document.createElement('DIV');
		monDiv3.setAttribute("id", "piece2");
		monDiv3.className = 'divPuzzle';
		monDiv3.innerHTML = "";
		monDiv3.style.backgroundImage="url("+url+")";
		monDiv3.style.backgroundPosition='0% '+'100%';
		monDiv3.style.width = morceauWidth+"px";
		monDiv3.style.height = morceauHeight+"px";
		monDiv3.style.display = 'inline-block';
		monDiv3.style.marginRight = '3px';
		monDiv3.setAttribute("draggable", "true");
		sessionStorage.setItem("piece2","place2");
		monDiv3.setAttribute("ondragstart","drag(this, event);");

		var monDiv4 = document.createElement('DIV');
		monDiv4.setAttribute("id", "piece3");
		monDiv4.className = 'divPuzzle';
		monDiv4.innerHTML = "";
		monDiv4.style.backgroundImage="url("+url+")";
		monDiv4.style.backgroundPosition='100% '+'100%';
		monDiv4.style.width = morceauWidth+"px";
		monDiv4.style.height = morceauHeight+"px";
		monDiv4.style.marginRight = '3px';
		monDiv4.style.display = 'inline-block';
		sessionStorage.setItem("piece3","place3");
		monDiv4.setAttribute("ondragstart","drag(this, event);");

		Myctn.appendChild(monDiv2);
		Myctn.appendChild(monDiv);
		Myctn.appendChild(monDiv4);
		Myctn.appendChild(monDiv3);
		
	}
	else if(nbrPiece == 9)
	{

	}
	else if(nbrPiece == 16)
	{

	}
} 