
var idIaStatic = 0;

function IA(id, difficulty, delayActions, joueur){
	this.idIa = id;
	this.difficulty= difficulty; //un chiffre
	this.delayActions = delayActions; //setTimeout(nomFunction, delayEnMS);
	this.joueur = joueur;
	this.playCard = playCard_alea;
	
	this.play = function (){
		setTimeout(this.playCard, this.delayActions);
	}
}

function newIA_easy(joueur){
	var ia = new IA(idIaStatic, 1, 750, joueur); //Un truc dans le genre
	idIaStatic++;
	return ia;
}



function playCard_alea(){
	
	var a = alea(0,this.joueur.carteEnMain.length);
	if(a != this.joueur.carteEnMain.length){ //si on tente de jouer une carte de notre main
		var isPlayed = false;
		while(isPlayed){ //tant qu'on arrive pas à jouer une carte on essaie une autre carte
			
			var evt = {target : {id : this.joueur.carteEnMain[a]}}; //evt.target.id
			
			 poserCarte(evt);
			
			a++; //carte suivante, au pire on pioche
		}
	} else { //si on veut piocher
		piocherCarte();
	}
}


















