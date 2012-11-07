// JavaScript Document
// check for drag and drop support
var iOS = !!navigator.userAgent.match('iPhone OS') || !!navigator.userAgent.match('iPad');

//nombre piece du puzzle
sessionStorage.setItem("nomprePiece",4);

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
// randomize the pieces to display
images.sort(function() {return 0.5 - Math.random()});
for (i=0; i<9; i++) {
	$('#pieces').append("<img width=\"320\" height=\"320\" src=\"./res/img/Animaux/"+images[i]+"\" id=\"piece"+i+"\" draggable=true ondragstart=\"drag(this, event);\">");
	sessionStorage.setItem("piece"+i,"place"+i);
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
		alert('gagneeeeeee');
	}

}

function resize() {
	var largeur=screen.availWidth*0.8;
	document.getElementById('puzzle-frame2').style.height=(largeur)+'px';
	document.getElementById('puzzle-frame2').style.width=(largeur)+'px';
	for (i=0; i<sessionStorage.getItem("nomprePiece"); i++) {
		document.getElementById('piece'+i).style.height=(largeur/2)+'px';
		document.getElementById('piece'+i).style.width=(largeur/2)+'px';
		document.getElementById('place'+i).style.height=(largeur/2)+'px';
		document.getElementById('place'+i).style.width=(largeur/2)+'px';
	}
}