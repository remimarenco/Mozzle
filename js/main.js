// Lorsque Jquery mobile est pret ...
$(document).bind("mobileinit", function(){
  // TODO Configurer jquerymobile (http://jquerymobile.com/test/docs/api/globalconfig.html)
});

// Lorsque Phonegap est pret ...
window.addEventListener('load', function () {
    document.addEventListener('deviceready', onDeviceReady, false);
}, false);

function onDeviceReady(){
    // TODO mettre le code ici une fois l'appli fini pour le test avec phonegap
}





// TODO a wrap dans un module javascript
var nbDragAction = 1;   // Nombre de fois que l'on peux jouer (autant que de lettre + 1)

// TODO Declenchement du jeu de mot niveau i avec controle de la difficulté dans la fonction
// Déclenchement du jeu mot niveau 1
$( '#mot-niveau-1' ).live( 'pageshow',function(event){
    
    // On choisie un mot aléatoirement
    var word = getOneRandomWord();
    var wordLength = word['libelle'].length;
    
    var nbFirstLetter = Math.floor(wordLength / 3);     // On récupère un nombre de lettre a afficher suivant la taille du mot
    var lettreRestante = new Array();
    
    $.each(word['lettres'],function(i,val){
        // TODO
        // Si facile
            // On affiche en blanc
        // Si facile ou moyen
            // On affiche en noire les premieres lettres
        if(i<=nbFirstLetter){
            $('#ordre ul').append("<li id='"+val+"'>"+val+"</li>");    // On ajoute les premieres lettres en noire
        }else{
            lettreRestante.push(val);
            $('#ordre ul').append("<li id='"+val+"' class='font-white' ondragenter='return false;' ondragover='return false;' ondrop=\'drop_mot(this, event)\'>"+val+"</li>");    // On ajoute les indications pour facile et moyen
        }
    });

    // Dans tout les cas,on affiche les lettres dans le desordre
    lettreRestante.sort(function() { return 0.5 - Math.random() });
    $.each(lettreRestante,function(i,val){
        $('#desordre ul').append("<li id='desordre_"+val+"' draggable='true' ondragstart=\'drag_mot(this, event)\'>"+val+"</li>");    // On ajoute les lettres restantes        
        nbDragAction++;     // Il y a autant d'action que de nombre de lettre dans le mot + 1
    });

    // On ajoute notre element sur la page
    $('#illustration').append("<img src='res/img/"+word['categorie']+"/"+word['libelle']+".png' />");
	// audio mot complet
	$('#illustration').append("<audio autoplay><source src='"+word['audio']+"' type='audio/ogg'></audio>");
});

function getOneRandomWord(){
    return data[Math.floor(Math.random()*data.length)]; // On mélange la liste
}

function drag_mot(draggableitem, e) {
    var lettre = $(draggableitem).attr('id');
    lettre = lettre.replace('desordre_','');
    e.dataTransfer.setData("lettre", lettre);
}

function drop_mot(target, e) {
    if(nbDragAction==0){
        alert('Perdu '); // TODO a changer par une popup p-e
        // Jouer son perdu
    }
    var lettre = e.dataTransfer.getData('lettre');
    var target = $(target);
    var source = $('#desordre_'+lettre);
    if(target.attr('id')==lettre){
        target.html(lettre);
        target.removeClass('font-white');
        source.remove();
        e.preventDefault();
    }
    nbDragAction--;     // On décrémente le nombre de drag restant
}

