// JavaScript Document
// check for drag and drop support
var iOS = !!navigator.userAgent.match('iPhone OS') || !!navigator.userAgent.match('iPad');
afficherScore();
//nombre piece du puzzle
sessionStorage.setItem("nomprePiece",9);

//on initialisele tableau contenant l'etat des places
for (i=0; i<sessionStorage.getItem("nomprePiece"); i++) {
	sessionStorage.setItem("place"+i,0);
}
// set images array
var images = [];
var piece = "";
var place = ""; 
for (i=0; i<9; i++) {
	j = i+1;
	images[i] = "animal" + j + ".png"; 	
}
// affichage des pieces
images.sort(function() {return 0.5 - Math.random()});
for (i=0; i<sessionStorage.getItem("nomprePiece"); i++) {
	$('#pieces').append("<img width=\"320\" height=\"320\" src=\"./res/img/Animaux/"+images[i]+"\" id=\"piece"+i+"\" draggable=true ondragstart=\"drag(this, event);\">");
	sessionStorage.setItem("piece"+i,"place"+i);
	console.log("piece"+i+" place"+i);
	// iPhone and iPad functionality
	if (iOS) {
		piece = "piece"+i;
		place = "place"+i;
		$("#piece"+i).css('float','left');
		new webkit_draggable(piece, {revert : false, scroll : true} );
		webkit_drop.add(place, {onDrop : function() { 
			$("#place"+i).append(piece);
		}
		});
	}

}
// add drag and drop functions on the frame divs

//des places dans le puzzle frame
for (i=0; i<sessionStorage.getItem("nomprePiece"); i++) {
	$('#puzzle-frame2').append("<div id=\"place"+i+"\" ondrop=\"drop(this, event);\" ondragenter=\"return false;\" ondragover=\"return false;\"></div>");
      //redimensionement
}
 resize();
 
 
function drag(draggableitem, e) {
	e.dataTransfer.setData("Text", draggableitem.id);	
}
function drop(target, e) {
	var id = e.dataTransfer.getData('Text');

	//on recupere dans le local storage la place de depart de la piece
	var placeOfPiece = sessionStorage.getItem(id);
	alert(placeOfPiece +" "+target.id);

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
	alert('gagneeeeeee');
	ajouterAuScore(10);
	liresound ('res\audio\bruitagePuzzle\Fr-B.ogg');
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