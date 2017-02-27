
var pioche;
var batailles;
var joueurs;
var idJoueurActif; //celui qui est en train de jouer

function alea(min, max){
	return Math.floor(Math.random()*(max-min+1)+min) ;
}

function melangerPioche(){
	var place = 0;
	var const;
	for(var i = 0; i < pioche.length; i++){
		place = alea(0, pioche.length);
		const = pioche[i];
		pioche[i] = pioche[place];
		pioche[place] = const;
	}
}

function initPioche(){
	 
}

function piocherCarte(){
	
}

function initJoueurs(){ //associer actionJoueur() au onClick onKeyDown
	
}

function initJeu(){
	
}

function afficherJeu(){
	
}

function isPartieFinie(){ //pioche.size = 0, un des joueurs n'as plus de cartes en main
	if(pioche.size==0&&(joueurs[0].cartesEnMain==null||joueurs[0].cartesEnMain==null)){
		return true;
	}else{
		return false;
	}
}

function finDeTour(){ //donne la main au joueurSuivant, isBataillesGagnant(), isPartieFinie()
	if(idJoueurActif==joueurs[0].idJoueur){
		idJoueurActif=joueurs[1].idJoueur;
	}else{
		finDeTourDeJeu();
	}
}


function finDeTourDeJeu(){ //est parfois appelé par finDeTour quand on a fini le tour de chaque joueurs
	bataillesGagnantes();
	if(isPartieFinie()){
							//Une fonction pour finir le jeu? 
	}else{
		idJoueurActif=joueurs[0].idJoueur;
	}
	
}

function bataillesGagnantes(){ // met à jour chacune des batailles
	
}

function poserGalion(){
	
}

function poserPirate(){
	
}

function poserAmiral(){
	
}

function Capitaine(){
	
}

function selectionnerCarte(){
	
}

function joueurCarte(){
	
}

function actionJoueur(){ // piocher, selectionnerCarte, jouerCarte; appel finDeTour()
	
}
