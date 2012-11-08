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
var word = '';

// TODO Declenchement du jeu de mot niveau i avec controle de la difficulté dans la fonction

// Déclenchement du jeu mot niveau 1
$( '#mot-niveau-1' ).live( 'pageshow',function(event){
    // On suprime les eventuels element restant
    $('#illustration').empty();
    $('#ordre ul').empty();
    $('#desordre ul').empty();
    
    // On choisie un mot aléatoirement
    word = getOneRandomWord();
    var wordLength = word['libelle'].length;
    
    var nbFirstLetter = Math.floor(wordLength / 3);     // On récupère un nombre de lettre a afficher suivant la taille du mot
    var lettreRestante = new Array(); // Tableau contenant les lettres restant a jouer
    $.each(word['lettres'],function(i,val){
        nbDragAction++;     // Il y a autant d'action que de nombre de lettre dans le mot + 1
        if(i<=nbFirstLetter){
            $('#ordre ul').append("<li onClick='jouerSon();' id='"+val['libelle']+"'>"+val['libelle']+"</li>");    // On ajoute les premieres lettres en noire
        }else{
            lettreRestante.push(val);
            $('#ordre ul').append("<li id='"+val['libelle']+"' class='font-white vide' ondragenter='return false;' ondragover='return false;' ondrop=\'drop_mot(this, event, 1)\'>"+val['libelle']+"</li>");    // On ajoute les indications pour facile et moyen
        }
    });

    // Dans tout les cas,on affiche les lettres dans le desordre
    lettreRestante.sort(function() { return 0.5 - Math.random() });
    $.each(lettreRestante,function(i,val){
        $('#desordre ul').append("<li onClick='jouerSon();' id='desordre_"+val['libelle']+"' draggable='true' ondragstart=\'drag_mot(this, event)\'>"+val['libelle']+"</li>");    // On ajoute les lettres restantes        
    });

    // On ajoute notre element sur la page
    $('#illustration').append("<img src='res/img/"+word['categorie']+"/"+word['libelle']+".png' />");

});

// Déclenchement du jeu mot niveau 2
$( '#mot-niveau-2' ).live( 'pageshow',function(event){
    // On supprime les eventuels element restant
    $('#illustration2').empty();
    $('#ordre2 ul').empty();
    $('#desordre2 ul').empty();

    // On choisie un mot aléatoirement
    word = getOneRandomWord();
    var wordLength = word['libelle'].length;
    
    var nbFirstLetter = Math.floor(wordLength / 3);     // On récupère un nombre de lettre a afficher suivant la taille du mot
    var lettreRestante = new Array(); // Tableau contenant les lettres restant a jouer
    
    $.each(word['lettres'],function(i,val){
        nbDragAction++;     // Il y a autant d'action que de nombre de lettre dans le mot + 1

        if(i<=nbFirstLetter){
            $('#ordre2 ul').append("<li id='"+val+"'>"+val+"</li>");    // On ajoute les premieres lettres en noire
        }else{
            lettreRestante.push(val);
            $('#ordre2 ul').append("<li id='"+val+"' class='vide' ondragenter='return false;' ondragover='return false;' ondrop=\'drop_mot(this, event,2)\'></li>"); 
        }
    });

    // Dans tout les cas,on affiche les lettres dans le desordre
    lettreRestante.sort(function() { return 0.5 - Math.random() });
    $.each(lettreRestante,function(i,val){
        $('#desordre2 ul').append("<li id='desordre_"+val+"' draggable='true' ondragstart=\'drag_mot(this, event)\'>"+val+"</li>");    // On ajoute les lettres restantes        
    });

    // On ajoute notre element sur la page
    $('#illustration2').append("<img src='res/img/"+word['categorie']+"/"+word['libelle']+".png' />");
});

// Déclenchement du jeu mot niveau 3
$( '#mot-niveau-3' ).live( 'pageshow',function(event){
    // On supprime les eventuels element restant
    $('#illustration3').empty();
    $('#ordre3 ul').empty();
    $('#desordre3 ul').empty();

    // On choisie un mot aléatoirement
    word = getOneRandomWord();
    
    var lettreRestante = new Array(); // Tableau contenant les lettres restant a jouer
    
    $.each(word['lettres'],function(i,val){
        nbDragAction++;     // Il y a autant d'action que de nombre de lettre dans le mot + 1
        lettreRestante.push(val);
        $('#ordre3 ul').append("<li id='"+val+"' class='vide' ondragenter='return false;' ondragover='return false;' ondrop=\'drop_mot(this, event,3)\'></li>"); 
    });

    // Dans tout les cas,on affiche les lettres dans le desordre
    lettreRestante.sort(function() { return 0.5 - Math.random() });
    $.each(lettreRestante,function(i,val){
        $('#desordre3 ul').append("<li id='desordre_"+val+"' draggable='true' ondragstart=\'drag_mot(this, event)\'>"+val+"</li>");    // On ajoute les lettres restantes        
    });

    // On ajoute notre element sur la page
    $('#illustration3').append("<img src='res/img/"+word['categorie']+"/"+word['libelle']+".png' />");

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

function drop_mot(target, e, difficulte) {
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
    if(difficulte==1){
        var verification = $('#order li');
    }
    if(difficulte==2){
        var verification = $('#order2 li');
    }
    if(difficulte==3){
        var verification = $('#order3 li');
    }
    verification.each(function(i,v){
        v = $(v);
        if(v.attr('id')!=v.html() || v.hasClass('vide') || v.hasClass('font-white')){
            lettreCorrecte = false;
        }    
    })

    if(lettreCorrecte == true){
		$('body').append("<audio autoplay><source src='"+word['audio']+"' type='audio/ogg'></audio>");
		$('#illustration').prepend("<div data-role='popup' style:'position: fixed;z-index:2;'><img src='res/img/boutons/gagne.gif'/></div>");
		$("#popupBasic").popup("open");

        // Son du mot
        // On incremente le score
        // On sauvegarde le score au local storage
        // On recharge la page
        //location.reload();

    }
    
    nbDragAction--;     // On décrémente le nombre de drag restant
    if(nbDragAction==0){
        //alert('Perdu '); // TODO a changer par une popup p-e
        // Jouer son perdu
    }
}

function jouerSon(){
    $('body').append("<audio autoplay><source src='"+word['P']['audio']+"' type='audio/ogg'></audio>");
}
