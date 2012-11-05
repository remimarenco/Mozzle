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
