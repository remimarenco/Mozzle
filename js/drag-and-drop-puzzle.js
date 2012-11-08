// JavaScript Document
// check for drag and drop support

var widthGlobale = 320;
var heightGlobale = 320;

$( '#puzzle-niveau1' ).live( 'pageshow',function(event){
	var niveau=1;
	var nombrePiece=4;
	initialisation(niveau,nombrePiece);
});
$( '#puzzle-niveau2' ).live( 'pageshow',function(event){
	var niveau=2;
	var nombrePiece=9;
	initialisation(niveau,nombrePiece);
});
$( '#puzzle-niveau3' ).live( 'pageshow',function(event){
	var niveau=3;
	var nombrePiece=16;
	initialisation(niveau,nombrePiece);
});

function initialisation(niveau,nombrePiece) {

	var iOS = !!navigator.userAgent.match('iPhone OS') || !!navigator.userAgent.match('iPad');
	
	//nombre piece du puzzle
	console.log("niveau "+niveau);
	
	sessionStorage.setItem("nombrePiece",nombrePiece);
	sessionStorage.setItem("niveau",niveau);
	
	//si on est au niveau 3 on gere le nombre de déplacement
	if(sessionStorage.getItem("niveau")==2) {
		sessionStorage.setItem("essaisRestants",10);
		afficherEssais();
	}


	//on initialisele tableau contenant l'etat des places
	for (i=1; i<=nombrePiece; i++) {
		sessionStorage.setItem("place"+i,0);
	}

	afficheMorceauPuzzle(nombrePiece);


	//des places dans le puzzle frame
	for (i=1; i<=nombrePiece; i++) {
		$('#puzzle-frame'+niveau).append("<div id=\"place"+i+"\"  ondrop=\"drop(this, event);\" ondragenter=\"return false;\" ondragover=\"return false;\"></div>");
		console.log("<div id=\"place"+i+"\"  ondrop=\"drop(this, event);\" ondragenter=\"return false;\" ondragover=\"return false;\"></div>");
	}
	
	var url = "res/img/animaux/animalPuzzle/animal1.png";
	createPuzzle(niveau, url);
	afficherScore();
	 //resize();
}
 
function drag(draggableitem, e) {
	e.dataTransfer.setData("Text", draggableitem.id);	
}
function drop(target, e) {
	var id = e.dataTransfer.getData('Text');

	//on recupere dans le local storage la place de depart de la piece
	var placeOfPiece = sessionStorage.getItem(id);

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

	for (i=1; i<=sessionStorage.getItem("nombrePiece");i++) {

		//si une place n'est pas occupé la partie est finie
		console.log("place"+i +" "+sessionStorage.getItem("place"+i));
		if (sessionStorage.getItem("place"+i)==0) 
		{
			estFinie=0;
		}

	}
	//si on est au niveau 3 on gere le nombre de déplacement
	if(sessionStorage.getItem("niveau")==2) {
		
		
		console.log("passage dans la modif nombre essais");
		//on décrémente le nombre d'essais
		var essaisRestants=parseInt(sessionStorage.getItem("essaisRestants"))-1;
		sessionStorage.setItem("essaisRestants",essaisRestants);
		
		//siil ne reste plus d'essais la partie est finie
		if(essaisRestants==0 && estFinie!=1)
		{
			partiePerdue();
		}
		afficherEssais();
	
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
	if(sessionStorage.getItem("nombrePiece")==4)
	{
		indice=2;
	} else 	if(sessionStorage.getItem("nombrePiece")==9)
	{
		indice=3;
	} else if(sessionStorage.getItem("nombrePiece")==16)
	{
		indice=4;
	}
	for (i=0; i<sessionStorage.getItem("nombrePiece"); i++) {

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
	//$('body').append("<audio autoplay><source src='"+word['audio']+"' type='audio/ogg'></audio>");
	var myVar=setTimeout(function(){$("#popupGagne").popup("open");},1500);
	setTimeout("$('#popupGagne').popup('close');", 5000);
	//alert("gagner");

	// On ajoute un score en fonction du niveau
	var niveau = sessionStorage.getItem("niveau");
	if(niveau == 1)
	{
		ajouterAuScore(10);
	}
	else if(niveau == 2)
	{
		ajouterAuScore(20);
	}
	else if(niveau == 3)
	{
		ajouterAuScore(30);
	}
}

//Function partiePerdue
//Fonction appellée lorsque le puzzle est finie, doit gérer le traitement de fin de partie perdue
function partiePerdue()
{
	//$('body').append("<audio autoplay><source src='"+word['audio']+"' type='audio/ogg'></audio>");
	//var myVar=setTimeout(function(){$("#popupGagne").popup("open");},1500);
	//setTimeout("$('#popupGagne').popup('close');", 5000);
	alert("perdueee");
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

	console.log("On affiche le score : "+sessionStorage.getItem("score"));
	

	//on recupere dans le score et on l'insere dans la div prévue
	$('#score'+sessionStorage.getItem("niveau")).html(sessionStorage.getItem("score"));
}

//Function afficher Score
//Recupere le score et l'insere dans la div "score"
function afficherEssais()
{
	console.log("essaisRestatnts"+sessionStorage.getItem("essaisRestants"));
	//on recupere dans le score et on l'insere dans la div prévues
	$('#essaisRestants'+sessionStorage.getItem("niveau")).html(sessionStorage.getItem("essaisRestants"));
}

function liresound (soundFile) { 
	var audio;
	audio = new Audio(soundFile);
	audio.play();
}

function createPuzzle(niveau, url)
{
	// On stocke le niveau dans le local storage
	sessionStorage.setItem("niveau",niveau);

	// Récupération de l'élément qui va contenir la div
	var myCtn=document.getElementById("puzzle-frame"+niveau);

	myCtn.style.height = heightGlobale + "px";
	myCtn.style.width = widthGlobale + "px";

	var morceauPuzzle = document.createElement('DIV');
	
	afficheMorceauPuzzle(niveau, url);
}

function afficheMorceauPuzzle(niveau, url)
{
	var morceauWidth;
	var morceauHeight;


	if(niveau == 1)
	{

		morceauHeight = heightGlobale / 2;
		morceauWidth = widthGlobale / 2;
		
		for (i=1; i<=sessionStorage.getItem("nombrePiece"); i++) {
			var place=document.getElementById("place"+i);
			place.style.height = morceauHeight+"px";
			place.style.width = morceauWidth+"px";
		}
		var Myctn=document.getElementById("pieces1");

		for(i=1;i<=4;i++)
		{
			var monDiv = document.createElement('DIV');
			monDiv.setAttribute("id", "piece"+i);
			monDiv.className = 'divPuzzle';
			monDiv.innerHTML = "";
			monDiv.style.backgroundImage="url("+url+")";

			if(i == 1)
			{
				monDiv.style.backgroundPosition ='0% '+'0%';
			}
			else if(i == 2)
			{
				monDiv.style.backgroundPosition = '100% '+'0%';
			}
			else if(i == 3)
			{
				monDiv.style.backgroundPosition = '0% '+'100%';
			}
			else if(i == 4)
			{
				monDiv.style.backgroundPosition = '100% '+'100%';
			}
			
			monDiv.style.width = morceauWidth+"px";
			monDiv.style.height = morceauHeight+"px";
			monDiv.style.display = 'inline-block';
			monDiv.setAttribute("draggable", "true");
			monDiv.style.marginRight = '3px';
			monDiv.style.border = 'solid black 3px';
			monDiv.setAttribute("margin-right", "3px");
			sessionStorage.setItem("piece"+i,"place"+i);
			monDiv.setAttribute("ondragstart","drag(this, event);");

			Myctn.appendChild(monDiv);
		}
	}
	else if(niveau == 2)
	{


		morceauHeight = heightGlobale / 3;
		morceauWidth = widthGlobale / 3;
				
		for (i=1; i<=sessionStorage.getItem("nombrePiece"); i++) {
			var place=document.getElementById("place"+i);
			place.style.height = morceauHeight+"px";
			place.style.width = morceauWidth+"px";
		}

		var Myctn=document.getElementById("pieces2");

		for(i=1;i<=9;i++)
		{
			var monDiv = document.createElement('DIV');
			monDiv.setAttribute("id", "piece"+i);
			monDiv.className = 'divPuzzle';
			monDiv.innerHTML = "";
			monDiv.style.backgroundImage="url("+url+")";

			if(i == 1)
			{
				monDiv.style.backgroundPosition ='0% '+'0%';
				sessionStorage.setItem("piece"+i,"place1");
			}
			else if(i == 2)
			{
				monDiv.style.backgroundPosition = '0% '+'100%';
				sessionStorage.setItem("piece"+i,"place7");
			}
			else if(i == 3)
			{
				monDiv.style.backgroundPosition = '50% '+'0%';
				sessionStorage.setItem("piece"+i,"place2");
			}
			else if(i == 4)
			{
				monDiv.style.backgroundPosition = '50% '+'50%';
				sessionStorage.setItem("piece"+i,"place5");
			}
			else if(i == 5)
			{
				monDiv.style.backgroundPosition = '50% '+'100%';
				sessionStorage.setItem("piece"+i,"place8");
			}
			else if(i == 6)
			{
				monDiv.style.backgroundPosition = '0% '+'50%';
				sessionStorage.setItem("piece"+i,"place4");
			}
			else if(i == 7)
			{
				monDiv.style.backgroundPosition = '100% '+'0%';
				sessionStorage.setItem("piece"+i,"place3");
			}
			else if(i == 8)
			{
				monDiv.style.backgroundPosition = '100% '+'50%';
				sessionStorage.setItem("piece"+i,"place6");
			}
			else if(i == 9)
			{
				monDiv.style.backgroundPosition = '100% '+'100%';
				sessionStorage.setItem("piece"+i,"place9");
			}
			
			monDiv.style.width = morceauWidth+"px";
			monDiv.style.height = morceauHeight+"px";
			monDiv.style.display = 'inline-block';
			monDiv.setAttribute("draggable", "true");
			monDiv.style.marginRight = '3px';
			monDiv.style.border = 'solid black 3px';
			monDiv.setAttribute("margin-right", "3px");
			monDiv.setAttribute("ondragstart","drag(this, event);");

			Myctn.appendChild(monDiv);
		}
	}
	else if(niveau == 3)
	{


		var Myctn=document.getElementById("pieces3");
		
		morceauHeight = heightGlobale / 4;
		morceauWidth = widthGlobale / 4;
		console.log("morceau "+	morceauHeight+" global "+heightGlobale);	
		for (i=1; i<=sessionStorage.getItem("nombrePiece"); i++) {
			var place=document.getElementById("place"+i);
			place.style.height = morceauHeight+"px";
			place.style.width = morceauWidth+"px";
		}

		for(i=1;i<=16;i++)
		{
			var monDiv = document.createElement('DIV');
			monDiv.setAttribute("id", "piece"+i);
			monDiv.className = 'divPuzzle';
			monDiv.innerHTML = "";
			monDiv.style.backgroundImage="url("+url+")";

			if(i == 1)
			{
				monDiv.style.backgroundPosition ='0% '+'0%';
				sessionStorage.setItem("piece"+i,"place1");
			}
			else if(i == 2)
			{
				monDiv.style.backgroundPosition = '0% '+'33%';
				sessionStorage.setItem("piece"+i,"place5");				
			}
			else if(i == 3)
			{
				monDiv.style.backgroundPosition = '0% '+'66%';
				sessionStorage.setItem("piece"+i,"place9");
			}
			else if(i == 4)
			{
				monDiv.style.backgroundPosition = '0% '+'100%';
				sessionStorage.setItem("piece"+i,"place13");
			}
			else if(i == 5)
			{
				monDiv.style.backgroundPosition = '33% '+'0%';
				sessionStorage.setItem("piece"+i,"place2");
			}
			else if(i == 6)
			{
				monDiv.style.backgroundPosition = '33% '+'33%';
				sessionStorage.setItem("piece"+i,"place6");
			}
			else if(i == 7)
			{
				monDiv.style.backgroundPosition = '33% '+'66%';
				sessionStorage.setItem("piece"+i,"place10");
			}
			else if(i == 8)
			{
				monDiv.style.backgroundPosition = '33% '+'100%';
				sessionStorage.setItem("piece"+i,"place14");
			}
			else if(i == 9)
			{
				monDiv.style.backgroundPosition = '66% '+'0%';
				sessionStorage.setItem("piece"+i,"place3");
			}
			else if(i == 10)
			{
				monDiv.style.backgroundPosition = '66% '+'33%';
				sessionStorage.setItem("piece"+i,"place7");
			}
			else if(i == 11)
			{
				monDiv.style.backgroundPosition = '66% '+'66%';
				sessionStorage.setItem("piece"+i,"place11");
			}
			else if(i == 12)
			{
				monDiv.style.backgroundPosition = '66% '+'100%';
				sessionStorage.setItem("piece"+i,"place15");
			}
			else if(i == 13)
			{
				monDiv.style.backgroundPosition = '100% '+'0%';
				sessionStorage.setItem("piece"+i,"place4");
			}
			else if(i == 14)
			{
				monDiv.style.backgroundPosition = '100% '+'33%';
				sessionStorage.setItem("piece"+i,"place8");
			}
			else if(i == 15)
			{
				monDiv.style.backgroundPosition = '100% '+'66%';
				sessionStorage.setItem("piece"+i,"place12");
			}
			else if(i == 16)
			{
				monDiv.style.backgroundPosition = '100% '+'100%';
				sessionStorage.setItem("piece"+i,"place16");
			}
			
			monDiv.style.width = morceauWidth+"px";
			monDiv.style.height = morceauHeight+"px";
			monDiv.style.display = 'inline-block';
			monDiv.setAttribute("draggable", "true");
			monDiv.style.marginRight = '3px';
			monDiv.style.border = 'solid black 3px';
			monDiv.setAttribute("margin-right", "3px");
			
			monDiv.setAttribute("ondragstart","drag(this, event);");

			Myctn.appendChild(monDiv);
		}
	}
} 