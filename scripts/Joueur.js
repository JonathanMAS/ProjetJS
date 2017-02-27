
var idJoueurStatic = 0;

function Joueur(idJoueur, pseudo, cartesEnMain, carteSelectionne, bataillesGagnees){
	this.idJoueur = idJoueur;
	this.pseudo = pseudo;
	this.cartesEnMain = cartesEnMain;
	this.carteSelectionne = carteSelectionne;
	this.bataillesGagnees = bataillesGagnees;
	
	//fait par Sandra
	this.getScore = function (){ //calcul le score du joueur grâce aux cartes dans bataillesGagnees, composé que de Galion ou d'autres cartes aussi ?????
		var score;	
		for(var i = 0; i < bataillesGagnees.length; i++){
			score = score + bataillesGagnees[i].valeur;
		}
		return score;
	}
	
	
	this.piocher = function (){		
		var carte = pioche.pop();
		cartesEnMain.push(carte);
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



















