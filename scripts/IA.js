
var idIaStatic = 0;

function IA(id, difficulty, delayActions){
	this.idIa = id;
	this.difficulty= difficulty; //un chiffre
	this.delayActions = delayActions; //setTimeout(nomFunction, delayEnMS);
	this.playCard = playCard_alea;
	
	this.play = function (){
        setTimeout(this.playCard,this.delayActions);
	}
}

function newIA_easy(){
	var ia = new IA(idIaStatic, 1, 500); //Un truc dans le genre
	idIaStatic++;
	return ia;
}

/*function playCard_piocher(){
	piocherCarte();
    while(isPaused){
        waitForIt();
    }
}*/

/*
function playCard_alea(){
	var a = alea(0,this.joueur.carteEnMain.length);
	if(a != this.joueur.carteEnMain.length){ //si on tente de jouer une carte de notre main
		var isPlayed = false;
		while(!isPlayed){ //tant qu'on arrive pas à jouer une carte on essaie une autre carte
			
			var evt = {target : {id : this.joueur.carteEnMain[a]}}; //evt.target.id
			
			 isPlayed = poserCarte(evt);
			
			a++; //carte suivante, au pire on pioche
		}
	} else { //si on veut piocher
		piocherCarte();
        while(isPaused){
            waitForIt();
        }
	}
}*/

function playCard_alea(){
    var piocher_jouer = alea(1,10); // Si piocher_jouer > 5 on tente de jouer sinon on pioche
    if(piocher_jouer>1){
        var index_carte_alea= 0;
        var jouable=0;
        var cpt=0;
        while(jouable!=1&&(cpt<joueurs[1].cartesEnMain.length)){ //tant qu'on arrive pas à jouer une carte on essaie une autre carte
            index_carte_alea= alea(0, joueurs[1].cartesEnMain.length-1);

            var evt = {target : { id : joueurs[1].cartesEnMain[index_carte_alea].idCarte }}; //evt.target.id
           // alert(evt.target.id);
            var carte = findCarte(evt.target.id);
          //  alert(carte);
            joueurs[idJoueurActif].carteSelectionnee = carte;
            jouable = poserCarte(evt);
            
            cpt++;
        }
        if(jouable!=1){
            piocherCarte();
        }
    }else{
        piocherCarte();
    }
    }



















