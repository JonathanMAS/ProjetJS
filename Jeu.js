
var pioche;
var batailles;
var joueurs;
var idJoueurActif; //celui qui est en train de jouer

function alea(min, max){
	return Math.floor(Math.random()*(max-min+1)+min) ;
}

function melangerPioche(){
	
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
	
}
function finDeTour(){ //donne la main au joueurSuivant, isBataillesGagnant(), isPartieFinie()
	
}
function finDeTourDeJeu(){ //est parfois appelé par finDeTour quand on a fini le tour de chaque joueurs
	
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