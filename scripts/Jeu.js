var pioche= [];
var batailles = [];
var joueurs = []; //array de joueur, indice 0 c'est nous
var idJoueurActif =0 ; //celui qui est en train de jouer

document.body.onload = start;
document.body.onresize = resize;


function alea(min, max){
	return Math.floor(Math.random()*(max-min+1)+min) ;
}

function start(){
    defineFieldGame();
    afficherPioche();
    initJeu();
    afficherPaquetsJoueurs();
}
function resize(){
    afficherPioche();
    defineFieldGame();
}

function melangerPioche(){
	var place = 0;
	var constante;
	for(var i = 0; i < pioche.length; i++){
		place = alea(0, pioche.length);
		constante = pioche[i];
		pioche[i] = pioche[place];
		pioche[place] = constante;
	}
}


function initPioche(){
  this.pioche= creerPaquet();
  melangerPioche(this.pioche);
 }

function piocherCarte(){
	var carte = pioche[pioche.length-1];
	//var mains = joueurs[idJoueurActif].cartesEnMain.length;
	joueurs[idJoueurActif].cartesEnMain.push(pioche[pioche.length-1]);
    pioche.pop();
}

function initJoueurs(){ //associer actionJoueur() au onClick onKeyDown
    	
	
	for(var j = 0; j < 2; j++){
		idJoueurActif = j;
        	joueurs.push(newJoueur([], null));
		for (var i=0;i<6;i++){
			piocherCarte();
		}
	}
}

function initJeu(){
    initPioche();
	initJoueurs();
}

function afficherJeu(){

}

function isPartieFinie(){ //pioche.size = 0, un des joueurs n'a plus de carte en main
	if(pioche.size==0 && (joueurs[0].cartesEnMain==null||joueurs[1].cartesEnMain==null)){
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
	if(isPartieFinie()){
		afficheFinPartie();					//Une fonction pour finir le jeu?
	}else{
		idJoueurActif=joueurs[0].idJoueur;
	}
}

function bataillesGagnantes(){ // met à jour chacune des batailles
	for(var i=0; this.batailles<this.batailles.length; i++){
		var victoire =  batailles[i].batailleGagnante();
		if(victoire!=-1){
			this.joueurs[victoire].bataillesGagnees=batailles[i];
		}
	}
}

function poserGalion(carte){
	this.batailles[this.batailles.length] = newBataille(Carte);
}

function poserPirate(bataille, carte){
	bataille.addCarte(carte);
}

function poserAmiral(bataille,carte){
	bataille.addCarte(carte);
}

function Capitaine(bataille,carte){
	bataille.addCarte(carte);
}

function selectionnerCarte(){

}


function jouerCarte(){
	if(carte.type="Galion"){
		poserGalion(carte);
	}
	if(carte.type="Pirate"){
		poserPirate(carte);
	}
	if(carte.type="Amiral"){
		poserAmiral(carte);
	}
	if(carte.type="Capitaine"){
		poserCapitaine(carte);
	}
}


function actionJoueur(){
    // piocher, selectionnerCarte, jouerCarte; appel finDeTour()
}
