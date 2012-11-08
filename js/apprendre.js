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

var word = '';

$("#type-learn").live( 'pageshow',function(event){
	 // On suprime les eventuels element restant
    $('#listA').empty();
    $('#listB').empty();
    $('#listC').empty();
	
	$.each(data,function(i,val){
		if(val['categorie']=="animaux"){
			$('#listA').append("<p onTouch=\"jouerSon('"+val['audio']+"')\" onClick=\"jouerSon('"+val['audio']+"')\" id='"+val['libelle']+"'>"+val['libelle']+"</p>"); 
		}
		else if(val['categorie']=="couleurs"){
			$('#listB').append("<p onTouch=\"jouerSon('"+val['audio']+"')\" onClick=\"jouerSon('"+val['audio']+"')\" id='"+val['libelle']+"'>"+val['libelle']+"</p>"); 
		}
		else{
			$('#listC').append("<p onTouch=\"jouerSon('"+val['audio']+"')\" onClick=\"jouerSon('"+val['audio']+"')\" id='"+val['libelle']+"'>"+val['libelle']+"</p>"); 
		}
	});
});



function jouerSon(audio){
	$('body').append("<audio autoplay><source src='"+audio+"' type='audio/ogg'></audio>");
}









