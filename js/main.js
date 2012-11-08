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

$(document).ready(function(){
    // On met a jour le score
    if(sessionStorage.getItem("score_mot")==null) {
        sessionStorage.setItem("score_mot",0);
    }
    $('#score_mot').html(sessionStorage.getItem("score_mot"));
})

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
    nbDragAction = 1;

    // On choisie un mot aléatoirement
    word = getOneRandomWord();
    var wordLength = word['libelle'].length;
    
    var nbFirstLetter = Math.floor(wordLength / 3);     // On récupère un nombre de lettre a afficher suivant la taille du mot
    var lettreRestante = new Array(); // Tableau contenant les lettres restant a jouer
    $.each(word['lettres'],function(i,val){
        nbDragAction++;     // Il y a autant d'action que de nombre de lettre dans le mot + 1
        if(i<=nbFirstLetter){
            $('#ordre ul').append("<li onClick=\"jouerSon('"+val['audio']+"')\" id='"+val['libelle']+"'>"+val['libelle']+"</li>");    // On ajoute les premieres lettres en noire
        }else{
            lettreRestante.push(val);
            $('#ordre ul').append("<li id='"+val['libelle']+"' class='font-white vide' ondragenter='return false;' ondragover='return false;' ondrop=\'drop_mot(this, event, 1)\'>"+val['libelle']+"</li>");    // On ajoute les indications pour facile et moyen
        }
    });

    // Dans tout les cas,on affiche les lettres dans le desordre
    lettreRestante.sort(function() { return 0.5 - Math.random() });
    $.each(lettreRestante,function(i,val){
        $('#desordre ul').append("<li onClick=\"jouerSon('"+val['audio']+"')\" id='desordre_"+val['libelle']+"' draggable='true' ondragstart=\'drag_mot(this, event)\'>"+val['libelle']+"</li>");    // On ajoute les lettres restantes        
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
    nbDragAction = 1;

    // On choisie un mot aléatoirement
    word = getOneRandomWord();
    var wordLength = word['libelle'].length;
    
    var nbFirstLetter = Math.floor(wordLength / 3);     // On récupère un nombre de lettre a afficher suivant la taille du mot
    var lettreRestante = new Array(); // Tableau contenant les lettres restant a jouer
    
    $.each(word['lettres'],function(i,val){
        nbDragAction++;     // Il y a autant d'action que de nombre de lettre dans le mot + 1

        if(i<=nbFirstLetter){
            $('#ordre2 ul').append("<li  onClick=\"jouerSon('"+val['audio']+"')\" id='"+val['libelle']+"'>"+val['libelle']+"</li>");    // On ajoute les premieres lettres en noire
        }else{
            lettreRestante.push(val);
            $('#ordre2 ul').append("<li id='"+val['libelle']+"' class='vide' ondragenter='return false;' ondragover='return false;' ondrop=\'drop_mot(this, event,2)\'></li>"); 
        }
    });

    // Dans tout les cas,on affiche les lettres dans le desordre
    lettreRestante.sort(function() { return 0.5 - Math.random() });
    $.each(lettreRestante,function(i,val){
        $('#desordre2 ul').append("<li  onClick=\"jouerSon('"+val['audio']+"')\" id='desordre_"+val['libelle']+"' draggable='true' ondragstart=\'drag_mot(this, event)\'>"+val['libelle']+"</li>");    // On ajoute les lettres restantes        
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
    nbDragAction = 1;

    // On choisie un mot aléatoirement
    word = getOneRandomWord();
    
    var lettreRestante = new Array(); // Tableau contenant les lettres restant a jouer
    
    $.each(word['lettres'],function(i,val){
        nbDragAction++;     // Il y a autant d'action que de nombre de lettre dans le mot + 1
        lettreRestante.push(val);
        $('#ordre3 ul').append("<li id='"+val['libelle']+"' class='vide' ondragenter='return false;' ondragover='return false;' ondrop=\'drop_mot(this, event,3)\'></li>"); 
    });

    // Dans tout les cas,on affiche les lettres dans le desordre
    lettreRestante.sort(function() { return 0.5 - Math.random() });
    $.each(lettreRestante,function(i,val){
        $('#desordre3 ul').append("<li  onClick=\"jouerSon('"+val['audio']+"')\" id='desordre_"+val['libelle']+"' draggable='true' ondragstart=\'drag_mot(this, event)\'>"+val['libelle']+"</li>");    // On ajoute les lettres restantes        
    });

    // On ajoute notre element sur la page
    $('#illustration3').append("<img src='res/img/"+word['categorie']+"/"+word['libelle']+".png' />");

});

// Permet d'obtenir un mot au hazard de la liste de mot
function getOneRandomWord(){
    return data[Math.floor(Math.random()*data.length)]; // On mélange la liste
}

// Permet de drager les mot dans le desordre
function drag_mot(draggableitem, e) {
    // On transfert la lettre a dropé a partir de l'id.
    var lettre = $(draggableitem).attr('id');
    lettre = lettre.replace('desordre_','');
    e.dataTransfer.setData("lettre", lettre); 
}

// Fonction permettant de dropper une lettre dans une case.
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
		// Son du mot
		$('body').append("<audio autoplay><source src='"+word['audio']+"' type='audio/ogg'></audio>");

        // On affiche une animation
        if(difficulte==1){
            var myVar=setTimeout(function(){$("#popupGagne").popup("open");},1500);
            setTimeout("$('#popupGagne').popup('close');", 5000);
            ajouterAuScoreMot(1);   // On incremente le score
        }
        if(difficulte==2){
            var myVar=setTimeout(function(){$("#popupGagne2").popup("open");},1500);
            setTimeout("$('#popupGagne2').popup('close');", 5000);
            ajouterAuScoreMot(2);   // On incremente le score
        }
        if(difficulte==3){
            var myVar=setTimeout(function(){$("#popupGagne3").popup("open");},1500);
            setTimeout("$('#popupGagne3').popup('close');", 5000);
            ajouterAuScoreMot(3);   // On incremente le score
        }

        // On recharge la page pour jouer avec un nouveau mot
		setTimeout(function(){location.reload();}, 6000);
    }
    
    nbDragAction--;     // On décrémente le nombre de drag restant
    if(nbDragAction==0){
        // Jouer son perdu
		$('body').append("<audio autoplay><source src='res/audio/boutons/perdu.wav' type='audio/wav'></audio>");
		
        if(difficulte==1){
            $("#popupPerdu").popup("open");
            setTimeout("$('#popupPerdu').popup('close');", 5000);
            ajouterAuScoreMot(-3);   // On incremente le score
        }
        if(difficulte==2){
            $("#popupPerdu2").popup("open");
            setTimeout("$('#popupPerdu2').popup('close');", 5000);
            ajouterAuScoreMot(-2);   // On incremente le score
        }
        if(difficulte==3){
            $("#popupPerdu3").popup("open");
            setTimeout("$('#popupPerdu3').popup('close');", 5000);
            ajouterAuScoreMot(-1);   // On incremente le score
        }

        setTimeout(function(){location.reload();}, 6000);
    }
}

function jouerSon(audio){
    $('body').append("<audio autoplay><source src='"+audio+"' type='audio/ogg'></audio>");
}

//Function ajouterAuScoreMot
//Ajoute en nombre passé en parametre au score du joueur pour le jeux mot
function ajouterAuScoreMot(scoreAAjouter)
{
    //si le score est nul on le met a 0
    if(sessionStorage.getItem("score_mot")==null)
    {
        sessionStorage.setItem("score_mot",0);
    }

    //ajoute le nouveau score au precedent et on le stocke
    var nouveauScore= parseInt(sessionStorage.getItem("score_mot"))+parseInt(scoreAAjouter);
    sessionStorage.setItem("score_mot",nouveauScore);

    // $('#score_mot').trigger("afficherScoreMot"); // On appel notre propre evenement pour afficher le score dès qu'il est mis a jour

}

//Function afficherScoreMot
//Recupere le score et l'insere dans note page pour le jeux mot
function afficherScoreMot()
{
    console.log('test');
    //si le score est nul on le met a 0

    
    //on recupere dans le score et on l'insere dans la div prévue
    
}
