// Lorsque Jquery mobile est pret ...
$(document).bind("mobileinit", function(){
  
});

// Lorsque Phonegap est pret ...
window.addEventListener('load', function () {
    document.addEventListener('deviceready', onDeviceReady, false);
}, false);

function onDeviceReady(){
    
}

// Déclenchement du jeu mot niveau 1
$( '#mot-niveau-1' ).live( 'pageshow',function(event){
    // recupéré la liste des mot
    $.each(data,function(i,val){
        console.log(i+' - '+val['libelle']);
    });

    // choisir un aléatoirement
    // recuperer sa taille
    // mettre l'image
    // remplir le mot en blanc (remplir la valeur de l'element et mettre du style pour caché)
    // parcours modulot la taille 
    // repasser en noir
    // taille - modulo deja colorié
    // pour cette taille afficher la grille du dessous (aleatoire) 

});


// evenement attaché a une case rempli => voir si c pas gerer par drag n drop

// nb drag n drop depasser => game over

// evenement => au drop d'une lettre
//  si c'est une case prise => gere par l'api
//  sinon on parcourt le mot
//   si c'est le bon style (ou bonne valeur pour chache case)
//      onjue le son de gagné







/*

// set images array
var images = [];
var piece = "";
var place = ""; 
for (i=0; i<12; i++) {
    j = i+1;
    images[i] = "puzzle-piece" + j + ".png";    
}
// randomize the pieces to display
images.sort(function() {return 0.5 - Math.random()});
for (i=0; i<12; i++) {
    $('#pieces').append("<img src=\"/examples/images/puzzle/"+images[i]+"\" id=\"piece"+i+"\" draggable=true ondragstart=\"drag(this, event);\">");

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
}*/