// JavaScript Document
// check for drag and drop support
var iOS = !!navigator.userAgent.match('iPhone OS') || !!navigator.userAgent.match('iPad');

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

function drag(draggableitem, e) {
	e.dataTransfer.setData("Text", draggableitem.id);	
}
function drop(target, e) {
	var id = e.dataTransfer.getData('Text');
	target.appendChild(document.getElementById(id));
	e.preventDefault();
}