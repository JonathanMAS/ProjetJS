
var idJoueurStatic = 0;

function Joueur(idJoueur, pseudo, cartesEnMain, carteSelectionne, bataillesGagnees){
	this.idJoueur = idJoueur;
	this.pseudo = pseudo;
	this.cartesEnMain = cartesEnMain;
	this.carteSelectionne = carteSelectionne;
	this.bataillesGagnees = bataillesGagnees;
	
	this.getScore = function (){ //calcul le score du joueur grâce aux cartes dans bataillesGagnees
		//TODO
	}
	this.piocher = function (){
		//TODO
	}
	this.poser = function(carte){
		//TODO
	}
}

function newJoueur(cartes, pseudo){
	var j = new Joueur(idJoueurStatic, pseudo, cartes, null, []); //Un truc dans le genre
	idJoueurStatic++;
	return j;
}



















