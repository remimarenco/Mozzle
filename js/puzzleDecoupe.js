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

		var Myctn=document.getElementById("pieces");

		for(i=1;i<=4;i++)
		{
			var monDiv = document.createElement('DIV');
			monDiv.setAttribute("id", "piece"+i);
			monDiv.className = 'divPuzzle';
			monDiv.innerHTML = "";
			monDiv.style.backgroundImage="url("+url+")";

			if(i == 1)
			{
				monDiv.style.backgroundPosition ='0% '+'0%';
			}
			else if(i == 2)
			{
				monDiv.style.backgroundPosition = '100% '+'0%';
			}
			else if(i == 3)
			{
				monDiv.style.backgroundPosition = '0% '+'100%';
			}
			else if(i == 4)
			{
				monDiv.style.backgroundPosition = '100% '+'100%';
			}
			
			monDiv.style.width = morceauWidth+"px";
			monDiv.style.height = morceauHeight+"px";
			monDiv.style.display = 'inline-block';
			monDiv.setAttribute("draggable", "true");

			Myctn.appendChild(monDiv);
		}
	}
	else if(niveau == 2)
	{

		morceauHeight = heightGlobale / 3;
		morceauWidth = widthGlobale / 3;

		var Myctn=document.getElementById("pieces2");

		for(i=1;i<=9;i++)
		{
			var monDiv = document.createElement('DIV');
			monDiv.setAttribute("id", "piece"+i);
			monDiv.className = 'divPuzzle';
			monDiv.innerHTML = "";
			monDiv.style.backgroundImage="url("+url+")";

			if(i == 1)
			{
				monDiv.style.backgroundPosition ='0% '+'0%';
			}
			else if(i == 2)
			{
				monDiv.style.backgroundPosition = '0% '+'100%';
			}
			else if(i == 3)
			{
				monDiv.style.backgroundPosition = '50% '+'0%';
			}
			else if(i == 4)
			{
				monDiv.style.backgroundPosition = '50% '+'50%';
			}
			else if(i == 5)
			{
				monDiv.style.backgroundPosition = '50% '+'100%';
			}
			else if(i == 6)
			{
				monDiv.style.backgroundPosition = '0% '+'50%';
			}
			else if(i == 7)
			{
				monDiv.style.backgroundPosition = '100% '+'0%';
			}
			else if(i == 8)
			{
				monDiv.style.backgroundPosition = '100% '+'50%';
			}
			else if(i == 9)
			{
				monDiv.style.backgroundPosition = '100% '+'100%';
			}
			
			monDiv.style.width = morceauWidth+"px";
			monDiv.style.height = morceauHeight+"px";
			monDiv.style.display = 'inline-block';
			monDiv.setAttribute("draggable", "true");

			Myctn.appendChild(monDiv);
		}
	}
	else if(niveau == 3)
	{
		morceauHeight = heightGlobale / 4;
		morceauWidth = widthGlobale / 4;

		var Myctn=document.getElementById("pieces3");

		for(i=1;i<=16;i++)
		{
			var monDiv = document.createElement('DIV');
			monDiv.setAttribute("id", "piece"+i);
			monDiv.className = 'divPuzzle';
			monDiv.innerHTML = "";
			monDiv.style.backgroundImage="url("+url+")";

			if(i == 1)
			{
				monDiv.style.backgroundPosition ='0% '+'0%';
			}
			else if(i == 2)
			{
				monDiv.style.backgroundPosition = '0% '+'33%';
			}
			else if(i == 3)
			{
				monDiv.style.backgroundPosition = '0% '+'66%';
			}
			else if(i == 4)
			{
				monDiv.style.backgroundPosition = '0% '+'100%';
			}
			else if(i == 5)
			{
				monDiv.style.backgroundPosition = '33% '+'0%';
			}
			else if(i == 6)
			{
				monDiv.style.backgroundPosition = '33% '+'33%';
			}
			else if(i == 7)
			{
				monDiv.style.backgroundPosition = '33% '+'66%';
			}
			else if(i == 8)
			{
				monDiv.style.backgroundPosition = '33% '+'100%';
			}
			else if(i == 9)
			{
				monDiv.style.backgroundPosition = '66% '+'0%';
			}
			else if(i == 10)
			{
				monDiv.style.backgroundPosition = '66% '+'33%';
			}
			else if(i == 11)
			{
				monDiv.style.backgroundPosition = '66% '+'66%';
			}
			else if(i == 12)
			{
				monDiv.style.backgroundPosition = '66% '+'100%';
			}
			else if(i == 13)
			{
				monDiv.style.backgroundPosition = '100% '+'0%';
			}
			else if(i == 14)
			{
				monDiv.style.backgroundPosition = '100% '+'33%';
			}
			else if(i == 15)
			{
				monDiv.style.backgroundPosition = '100% '+'66%';
			}
			else if(i == 16)
			{
				monDiv.style.backgroundPosition = '100% '+'100%';
			}
			
			monDiv.style.width = morceauWidth+"px";
			monDiv.style.height = morceauHeight+"px";
			monDiv.style.display = 'inline-block';
			monDiv.setAttribute("draggable", "true");

			Myctn.appendChild(monDiv);
		}
	}
}