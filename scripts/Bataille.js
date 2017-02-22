
function Bataille(listeCarte, galion){
	this.listeCarte = listeCarte;
	this.galion = galion;
	
	this.batailleGagnante = function(){ //renvoie l'id du Joueur qui gagne ou -1 si égalité
		//TODO
	}
	
	this.addCarte = function(carte){
		this.listeCarte.push(carte);
	}
}

function newBataille(galion){
	var b = new Bataille([galion], galion); 
	return b;
}










