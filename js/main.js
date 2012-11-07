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
    var lettreRestante = new Array(); // Tableau contenant les lettres restant a jouer
    
    $.each(word['lettres'],function(i,val){
        nbDragAction++;     // Il y a autant d'action que de nombre de lettre dans le mot + 1

        // TODO
        // Si facile
            // On affiche en blanc
        // Si facile ou moyen
            // On affiche en noire les premieres lettres
        if(i<=nbFirstLetter){
            $('#ordre ul').append("<li id='"+val+"'>"+val+"</li>");    // On ajoute les premieres lettres en noire
        }else{
            lettreRestante.push(val);
            $('#ordre ul').append("<li id='"+val+"' class='font-white vide' ondragenter='return false;' ondragover='return false;' ondrop=\'drop_mot(this, event)\'>"+val+"</li>");    // On ajoute les indications pour facile et moyen
        }
    });

    // Dans tout les cas,on affiche les lettres dans le desordre
    lettreRestante.sort(function() { return 0.5 - Math.random() });
    $.each(lettreRestante,function(i,val){
        $('#desordre ul').append("<li id='desordre_"+val+"' draggable='true' ondragstart=\'drag_mot(this, event)\'>"+val+"</li>");    // On ajoute les lettres restantes        
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
    // On transfert la lettre a dropé a partir de l'id.
    var lettre = $(draggableitem).attr('id');
    lettre = lettre.replace('desordre_','');
    e.dataTransfer.setData("lettre", lettre); 
}

function drop_mot(target, e) {
    var lettre = e.dataTransfer.getData('lettre');
    var target = $(target); //Element dropable
    var source = $('#desordre_'+lettre); // Element draggable
    var lettreCorrecte = true; // Boolean permettant de connaitre quand le jeu est gagné

    if(target.attr('id')==lettre && target.hasClass('vide') ){
        target.html(lettre);

        // On enlève les classes specifiant que la case est vide
        target.removeClass('font-white');
        target.removeClass('vide');

        // On retire la lettre draggable un fois quelle est a la bonne place
        source.remove();
        e.preventDefault();
    }

    // Parcourt du mot pour voir s'il est fini et juste   
    $('.order li').each(function(i,v){
        v = $(v);
        if(v.attr('id')!=v.html() || v.hasClass('vide') || v.hasClass('font-white')){
            lettreCorrecte = false;
        }    
    })

    if(lettreCorrecte == true){
        alert('win'); // TODO Anim et son ,...
    }
    
    nbDragAction--;     // On décrémente le nombre de drag restant
    if(nbDragAction==0){
        //alert('Perdu '); // TODO a changer par une popup p-e
        // Jouer son perdu
    }
}

