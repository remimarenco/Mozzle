// JavaScript Document
// check for drag and drop support
var localStorage=window.localStorage;
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
	
	localStorage.setItem("nombrePiece",nombrePiece);
	localStorage.setItem("niveau",niveau);
	localStorage.setItem("estFinie",0);

	var url;
	
	//si on est au niveau 2 ou 3 on gere le nombre de déplacement
	if(localStorage.getItem("niveau")==1)
	{
		url = "res/img/animaux/animalPuzzle/animal1.png";
	}
	else if(localStorage.getItem("niveau")==2 ) {
		url = "res/img/animaux/animalPuzzle/animal2.png";
		localStorage.setItem("essaisRestants",18);
		afficherEssais();
	} else if (localStorage.getItem("niveau")==3) {
		url = "res/img/animaux/animalPuzzle/animal3.png";
		localStorage.setItem("essaisRestants",32);
		console.log("essai restant niveau3: "+localStorage.getItem('essaisRestants'));
		afficherEssais();
	}


	//on initialisele tableau contenant l'etat des places
	for (i=1; i<=nombrePiece; i++) {
		localStorage.setItem("place"+i,0);
	}

	afficheMorceauPuzzle(nombrePiece);


	//des places dans le puzzle frame
	for (i=1; i<=nombrePiece; i++) {
		$('#puzzle-frame'+niveau).append("<div id=\"place"+i+"\" ondrop=\"drop(this, event);\" ondragenter=\"return false;\" ondragover=\"return false;\"></div>");
	}
	
	
	createPuzzle(niveau, url);
	afficherScore();
	
	//on lance le compteur pour le 3 eme niveau
	if (localStorage.getItem("niveau")==3) {
		compteur();
	}

	 //resize();
}
 
function drag(draggableitem, e) {
	e.dataTransfer.setData("Text", draggableitem.id);	
}

function drop(target, e) {
	var id = e.dataTransfer.getData('Text');

	//on recupere dans le local storage la place de depart de la piece
	var placeOfPiece = localStorage.getItem(id);

	//on compare la place de la piece et la place ou elle doit etre deplacée
	if (placeOfPiece==target.id)
	{
		target.appendChild(document.getElementById(id));

		// On supprime les bordures autour de l'élément
		var maPiece = document.getElementById(id);
		maPiece.style.border = "none";

		//on indique que cet emplacement est correctement remplit
		localStorage.setItem(target.id,1);
	}

	e.preventDefault();
	//on parcourt le local storage de toute les places pour verifier si la partie n'est pas finie
	var estFinie=1;

	for (i=1; i<=localStorage.getItem("nombrePiece");i++) {

		//si une place n'est pas occupé la partie est finie
		
		if (localStorage.getItem("place"+i)==0) 
		{
			estFinie=0;
		}

	}
	
	localStorage.setItem("estFinie",estFinie);
	
	//si on est au niveau 3 ou 2 on gere le nombre de déplacement
	if(localStorage.getItem("niveau")==2 || localStorage.getItem("niveau")==3 ) {
		

		//on décrémente le nombre d'essais
		var essaisRestants=parseInt(localStorage.getItem("essaisRestants"))-1;
		localStorage.setItem("essaisRestants",essaisRestants);
		
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
	if(localStorage.getItem("nombrePiece")==4)
	{
		indice=2;
	} else 	if(localStorage.getItem("nombrePiece")==9)
	{
		indice=3;
	} else if(localStorage.getItem("nombrePiece")==16)
	{
		indice=4;
	}
	for (i=0; i<localStorage.getItem("nombrePiece"); i++) {

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
	$("#popupGagnePuzzle"+localStorage.getItem("niveau")).popup("open");
	//$('body').append("<audio autoplay><source src='res/audio/animaux/Fr-chat.ogg' type='audio/ogg'></audio>");
	

	
	//setTimeout("$('#popupGagne"+localStorage.getItem('niveau')+"').popup('close');", 5000);

	// On ajoute un score en fonction du niveau
	var niveau = localStorage.getItem("niveau");
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
		//on ouvre une popup lorsque
	var myVar=setTimeout(function(){
		var niveauSuivant=parseInt(niveau)+1;
		if(niveauSuivant<4)
		{
			//transition vers la page du niveau suivant
			$.mobile.changePage( "#puzzle-niveau"+niveauSuivant);
		} else {
			$.mobile.changePage( "#type-puzzle");
		}
	},1500);
	
}

//Function partiePerdue
//Fonction appellée lorsque le puzzle est finie, doit gérer le traitement de fin de partie perdue
function partiePerdue()
{
	//on ouvre une popup lorsque
	$("#popupPerduPuzzle"+localStorage.getItem("niveau")).popup("open");
	$('body').append("<audio autoplay><source src='res/audio/boutons/perdu.ogg' type='audio/ogg'></audio>");
	

	var myVar=setTimeout(function(){
		location.reload();
	},2000);
	
	//setTimeout("$('#popupPerdu"+localStorage.getItem('niveau')+"').popup('close');", 5000);
	//setTimeout(function(){location.reload();}, 6000);
	var niveau = localStorage.getItem("niveau");
	if(niveau == 3)
	{
		ajouterAuScore(-10);
	}
	
	afficherScore();

}

//Function ajouterAuScore
//Ajoute en nombre passé en parametre au score du joueur
function ajouterAuScore(scoreAAjouter)
{
	//si le score est nul on le met a 0
	if(localStorage.getItem("score")==null)
	{
		localStorage.setItem("score",0);
	}
	//ajoute le nouveau score au precedent et on le stocke
	var nouveauScore= parseInt(localStorage.getItem("score"))+parseInt(scoreAAjouter);

	if(nouveauScore < 0)
	{
		nouveauScore = 0;
	}

	localStorage.setItem("score",nouveauScore);
	
	afficherScore();
}

//Function afficher Score
//Recupere le score et l'insere dans la div "score"
function afficherScore()
{
	//si le score est nul on le met a 0
	if(localStorage.getItem("score")==null)
	{
		localStorage.setItem("score",0);
	}

	//on recupere dans le score et on l'insere dans la div prévue
	$('#score'+localStorage.getItem("niveau")).html(localStorage.getItem("score"));
}

//Function afficher Score
//Recupere le score et l'insere dans la div "score"
function afficherEssais()
{
	console.log("afficher essais: "+localStorage.getItem('essaisRestants'));
	//on recupere dans le score et on l'insere dans la div prévues
	$('#essaisRestants'+localStorage.getItem("niveau")).html(localStorage.getItem("essaisRestants"));
}

function liresound (soundFile) {
	var audio;
	audio = new Audio(soundFile);
	audio.play();
}

function createPuzzle(niveau, url)
{
	// On stocke le niveau dans le local storage
	localStorage.setItem("niveau",niveau);

	// Récupération de l'élément qui va contenir la div
	var myCtn=document.getElementById("puzzle-frame"+niveau);

	myCtn.style.height = heightGlobale + "px";
	myCtn.style.width = widthGlobale + "px";
	
	afficheMorceauPuzzle(niveau, url);

	// On affiche l'image miniature exemple
	affichageMiniature(niveau, url);
}

function affichageMiniature(niveau, url)
{
	var divImageMiniature = document.getElementById("imageMiniature"+niveau);

	var imageMiniature = document.createElement('IMG');
	imageMiniature.src = url;
	imageMiniature.style.height = "100%";
	imageMiniature.style.width = "100%";

	divImageMiniature.style.border = 'solid black 3px';

	divImageMiniature.appendChild(imageMiniature);
}

function afficheMorceauPuzzle(niveau, url)
{
	var morceauWidth;
	var morceauHeight;
	var Myctn;
	// On créé un tableau dans lequel on va stocker les div
	var MonTableau = new Array();

	if(niveau == 1)
	{
		morceauHeight = heightGlobale / 2;
		morceauWidth = widthGlobale / 2;
		
		for (i=1; i<=localStorage.getItem("nombrePiece"); i++) {
			var place=document.getElementById("place"+i);
			place.style.height = morceauHeight+"px";
			place.style.width = morceauWidth+"px";
		}
		Myctn=document.getElementById("pieces1");

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
			monDiv.setAttribute("draggable", "true");
			monDiv.style.margin = 'auto';
			monDiv.style.marginBottom = '3px';
			monDiv.style.border = 'solid black 3px';
			localStorage.setItem("piece"+i,"place"+i);
			monDiv.setAttribute("ondragstart","drag(this, event);");

			var indice = Math.floor(Math.random()*4);
			while(MonTableau[indice] != null)
			{
				indice = Math.floor(Math.random()*4);
			}
			MonTableau[indice] = monDiv;	
		}

		for(i=0;i<4;i++)
		{
			Myctn.appendChild(MonTableau[i]);
		}
	}
	else if(niveau == 2)
	{
		morceauHeight = heightGlobale / 3;
		morceauWidth = widthGlobale / 3;
				
		for (i=1; i<=localStorage.getItem("nombrePiece"); i++) {
			var place=document.getElementById("place"+i);
			place.style.height = morceauHeight+"px";
			place.style.width = morceauWidth+"px";
		}

		Myctn=document.getElementById("pieces2");

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
				localStorage.setItem("piece"+i,"place1");
			}
			else if(i == 2)
			{
				monDiv.style.backgroundPosition = '0% '+'100%';
				localStorage.setItem("piece"+i,"place7");
			}
			else if(i == 3)
			{
				monDiv.style.backgroundPosition = '50% '+'0%';
				localStorage.setItem("piece"+i,"place2");
			}
			else if(i == 4)
			{
				monDiv.style.backgroundPosition = '50% '+'50%';
				localStorage.setItem("piece"+i,"place5");
			}
			else if(i == 5)
			{
				monDiv.style.backgroundPosition = '50% '+'100%';
				localStorage.setItem("piece"+i,"place8");
			}
			else if(i == 6)
			{
				monDiv.style.backgroundPosition = '0% '+'50%';
				localStorage.setItem("piece"+i,"place4");
			}
			else if(i == 7)
			{
				monDiv.style.backgroundPosition = '100% '+'0%';
				localStorage.setItem("piece"+i,"place3");
			}
			else if(i == 8)
			{
				monDiv.style.backgroundPosition = '100% '+'50%';
				localStorage.setItem("piece"+i,"place6");
			}
			else if(i == 9)
			{
				monDiv.style.backgroundPosition = '100% '+'100%';
				localStorage.setItem("piece"+i,"place9");
			}
			
			monDiv.style.width = morceauWidth+"px";
			monDiv.style.height = morceauHeight+"px";
			monDiv.setAttribute("draggable", "true");
			monDiv.style.margin = 'auto';
			monDiv.style.marginBottom = '3px';
			monDiv.style.border = 'solid black 3px';
			monDiv.setAttribute("margin-right", "3px");
			monDiv.setAttribute("ondragstart","drag(this, event);");

			var indice = Math.floor(Math.random()*9);
			while(MonTableau[indice] != null)
			{
				indice = Math.floor(Math.random()*9);
			}
			MonTableau[indice] = monDiv;
		}

		for(i=0;i<9;i++)
		{
			Myctn.appendChild(MonTableau[i]);
		}
	}
	else if(niveau == 3)
	{


		Myctn=document.getElementById("pieces3");
		
		morceauHeight = heightGlobale / 4;
		morceauWidth = widthGlobale / 4;

		for (i=1; i<=localStorage.getItem("nombrePiece"); i++) {
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
				localStorage.setItem("piece"+i,"place1");
			}
			else if(i == 2)
			{
				monDiv.style.backgroundPosition = '0% '+'33%';
				localStorage.setItem("piece"+i,"place5");				
			}
			else if(i == 3)
			{
				monDiv.style.backgroundPosition = '0% '+'66%';
				localStorage.setItem("piece"+i,"place9");
			}
			else if(i == 4)
			{
				monDiv.style.backgroundPosition = '0% '+'100%';
				localStorage.setItem("piece"+i,"place13");
			}
			else if(i == 5)
			{
				monDiv.style.backgroundPosition = '33% '+'0%';
				localStorage.setItem("piece"+i,"place2");
			}
			else if(i == 6)
			{
				monDiv.style.backgroundPosition = '33% '+'33%';
				localStorage.setItem("piece"+i,"place6");
			}
			else if(i == 7)
			{
				monDiv.style.backgroundPosition = '33% '+'66%';
				localStorage.setItem("piece"+i,"place10");
			}
			else if(i == 8)
			{
				monDiv.style.backgroundPosition = '33% '+'100%';
				localStorage.setItem("piece"+i,"place14");
			}
			else if(i == 9)
			{
				monDiv.style.backgroundPosition = '66% '+'0%';
				localStorage.setItem("piece"+i,"place3");
			}
			else if(i == 10)
			{
				monDiv.style.backgroundPosition = '66% '+'33%';
				localStorage.setItem("piece"+i,"place7");
			}
			else if(i == 11)
			{
				monDiv.style.backgroundPosition = '66% '+'66%';
				localStorage.setItem("piece"+i,"place11");
			}
			else if(i == 12)
			{
				monDiv.style.backgroundPosition = '66% '+'100%';
				localStorage.setItem("piece"+i,"place15");
			}
			else if(i == 13)
			{
				monDiv.style.backgroundPosition = '100% '+'0%';
				localStorage.setItem("piece"+i,"place4");
			}
			else if(i == 14)
			{
				monDiv.style.backgroundPosition = '100% '+'33%';
				localStorage.setItem("piece"+i,"place8");
			}
			else if(i == 15)
			{
				monDiv.style.backgroundPosition = '100% '+'66%';
				localStorage.setItem("piece"+i,"place12");
			}
			else if(i == 16)
			{
				monDiv.style.backgroundPosition = '100% '+'100%';
				localStorage.setItem("piece"+i,"place16");
			}
			
			monDiv.style.width = morceauWidth+"px";
			monDiv.style.height = morceauHeight+"px";
			monDiv.setAttribute("draggable", "true");
			monDiv.style.margin = 'auto';
			monDiv.style.marginBottom = '3px';
			monDiv.style.border = 'solid black 3px';
			monDiv.setAttribute("margin-right", "3px");
			
			monDiv.setAttribute("ondragstart","drag(this, event);");

			var indice = Math.floor(Math.random()*16);
			while(MonTableau[indice] != null)
			{
				indice = Math.floor(Math.random()*16);
			}
			MonTableau[indice] = monDiv;
		}

		for(i=0;i<16;i++)
		{
			Myctn.appendChild(MonTableau[i]);
		}
	}
}


function compteur()
{
	$('#countdown').countDown({
		startNumber: 90,
		callBack: function(me) {
			$('#countdown').html('0');
			partiePerdue();
			
		}
	});

}  



//fonction jquerry pour le compteur
jQuery.fn.countDown = function(settings,to) {
	settings = jQuery.extend({
		startFontSize: '36px',
		endFontSize: '12px',
		duration: 1000,
		startNumber: 10,
		endNumber: 0,
		callBack: function() { }
	}, settings);
	return this.each(function() {
		
		//where do we start?
		if(!to && to != settings.endNumber) { to = settings.startNumber; }
		
		//set the countdown to the starting number
		$(this).text(to).css('fontSize',settings.startFontSize);
		
		//loopage
		$(this).animate({
			'fontSize': settings.endFontSize
		},settings.duration,'',function() {
			if(to > settings.endNumber + 1) {

				if(localStorage.getItem("estFinie")==0) 
				{
					$(this).css('fontSize',settings.startFontSize).text(to - 1).countDown(settings,to - 1);
				}
			}
			else
			{
				settings.callBack(this);
			}
		});
				
	});
};
