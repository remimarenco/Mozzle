var widthGlobale = 320;
var heightGlobale = 320;

function createPuzzle(niveau, url)
{
	// Récupération de l'élément qui va contenir la div
	console.log("Test");
	var myCtn=document.getElementById("puzzle-frame");

	myCtn.style.height = heightGlobale + "px";
	myCtn.style.width = widthGlobale + "px";

	var morceauPuzzle = document.createElement('DIV');

	afficheMorceauPuzzle(niveau, url);
}

function afficheMorceauPuzzle(niveau, url)
{
	var morceauWidth;
	var morceauHeight;

	if(niveau == 1)
	{
		morceauHeight = heightGlobale / 2;
		morceauWidth = widthGlobale / 2;

		var Myctn=document.getElementById("pieces2");

		var monDiv = document.createElement('DIV');
		monDiv.setAttribute("id", "piece1");
		monDiv.className = 'divPuzzle';
		monDiv.innerHTML = "";
		monDiv.style.backgroundImage="url("+url+")";
		monDiv.style.backgroundPosition='0% '+'0%';
		monDiv.style.width = morceauWidth+"px";
		monDiv.style.height = morceauHeight+"px";
		monDiv.style.display = 'inline-block';
		monDiv.setAttribute("draggable", "true");

		var monDiv2 = document.createElement('DIV');
		monDiv2.setAttribute("id", "piece2");
		monDiv2.className = 'divPuzzle';
		monDiv2.innerHTML = "";
		monDiv2.style.backgroundImage="url("+url+")";
		monDiv2.style.backgroundPosition='100% '+ '0%';
		monDiv2.style.width = morceauWidth+"px";
		monDiv2.style.height = morceauHeight+"px";
		monDiv2.style.display = 'inline-block';
		monDiv2.setAttribute("draggable", "true");

		var monDiv3 = document.createElement('DIV');
		monDiv3.setAttribute("id", "piece3");
		monDiv3.className = 'divPuzzle';
		monDiv3.innerHTML = "";
		monDiv3.style.backgroundImage="url("+url+")";
		monDiv3.style.backgroundPosition='0% '+'100%';
		monDiv3.style.width = morceauWidth+"px";
		monDiv3.style.height = morceauHeight+"px";
		monDiv3.style.display = 'inline-block';
		monDiv3.setAttribute("draggable", "true");

		var monDiv4 = document.createElement('DIV');
		monDiv4.setAttribute("id", "piece4");
		monDiv4.className = 'divPuzzle';
		monDiv4.innerHTML = "";
		monDiv4.style.backgroundImage="url("+url+")";
		monDiv4.style.backgroundPosition='100% '+'100%';
		monDiv4.style.width = morceauWidth+"px";
		monDiv4.style.height = morceauHeight+"px";
		monDiv4.style.display = 'inline-block';
		monDiv4.setAttribute("draggable", "true");
		
		Myctn.appendChild(monDiv);
		Myctn.appendChild(monDiv2);
		Myctn.appendChild(monDiv3);
		Myctn.appendChild(monDiv4);
	}
	else if(niveau == 2)
	{

	}
	else if(niveau == 3)
	{

	}
}