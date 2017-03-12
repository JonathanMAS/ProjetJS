
var idJoueurStatic = 0;

function Joueur(idJoueur, pseudo, cartesEnMain, carteSelectionne, bataillesGagnees, IA){
	this.idJoueur = idJoueur;
	this.pseudo = pseudo;
	this.cartesEnMain = cartesEnMain;
	this.carteSelectionne = carteSelectionne;
	this.bataillesGagnees = bataillesGagnees;
	this.IA = IA;
	
	//fait par Sandra
	this.getScore = function (){ //calcul le score du joueur grâce aux cartes dans bataillesGagnees, composé que de Galion ou d'autres cartes aussi ?????
		var score=0;
		for(var i = 0; i < bataillesGagnees.length; i++){
			score = score + bataillesGagnees[i].galion.valeur;
		}
		return score;
	}
	
	
	this.piocher = function (){		
		var carte = pioche.pop();
		cartesEnMain.push(carte);
	}
	
	this.supprimerCarteEnMain = function(idCarte){
		for(var i=0; i < this.cartesEnMain.length; i++){
			if(this.cartesEnMain[i].idCarte == idCarte){
				this.cartesEnMain.splice(i,1); //on le supprime de la main
				return true;
			}
		}
		return false;
	}
	
	
	this.poser = function(carte){
		//TODO
	}
}

function newJoueur(cartes, pseudo, IA){
	var j = new Joueur(idJoueurStatic, pseudo, cartes, null, [], IA); //Un truc dans le genre
	idJoueurStatic++;
	return j;
}



















