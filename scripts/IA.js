
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

/*
 function playCard_piocher(){
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
		while(!isPlayed){ //tant qu'on arrive pas � jouer une carte on essaie une autre carte
			
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
    var proba = 10;
    if(pioche.length==0){
        proba=10;
    }
    var piocher_jouer = alea(1,proba); // Si piocher_jouer > 1 on tente de jouer sinon on pioche
    
    if(piocher_jouer>1){
        var index_carte_alea= 0;
        var jouable=0;
        var cpt=0;
        while(jouable!=1&&(cpt<joueurs[idJoueurActif].cartesEnMain.length)){ //tant qu'on arrive pas � jouer une carte on essaie une autre carte
            index_carte_alea= alea(0, joueurs[idJoueurActif].cartesEnMain.length-1);

            var evt = {target : { id : joueurs[idJoueurActif].cartesEnMain[index_carte_alea].idCarte }}; //evt.target.id
            var carte = findCarte(evt.target.id);
            joueurs[idJoueurActif].carteSelectionne = carte;
            
            if(carte.type == "Pirate"){
                if(batailles.length!=0){
                    index_carte_alea= alea(0, batailles.length-1);
					var scoreIA = batailles[index_carte_alea].getScoreJoueur(joueurs[1].idJoueur) + carte.valeur;
					var scoreJoueur = batailles[index_carte_alea].getScoreJoueur(joueurs[0].idJoueur);
					if(scoreIA >= scoreJoueur){
						evt = {target : { id : batailles[index_carte_alea].galion.idCarte }};
					}
                   
                }
            }
          //  alert("carte event galion"+evt.target.id);
            jouable = poserCarte(evt);
            cpt++;
        }
        if(jouable!=1){
            if(pioche.length>0){
            piocherCarte();
            }else{
            finDeTour();
            }
        }
    }else{
        piocherCarte();
    }
    }



















