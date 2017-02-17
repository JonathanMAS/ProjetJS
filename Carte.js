
var idCarteStatic = 0;

function Carte(id, type, val, couleur, idJoueur, cheminImage){
	this.idCarte = id;
	this.type = type;
	this.valeur = val;
	this.couleur = couleur;
	this.idJoueur = idJoueur;
	this.cheminImage = cheminImage;
	
}

function newGalion(val){
	var g = new Carte(idCarteStatic, "Galion", val, "", -1, "assets/img/galion.png"); //Un truc dans le genre
	idCarteStatic++;
	return g;
}

function newPirate(val, couleur){
	var p = new Carte(idCarteStatic, "Pirate", val, couleur, -1, "assets/img/pirate_"+couleur+".png"); //Un truc dans le genre
	idCarteStatic++;
	return p;
}

function newCapitaine(val){
	var c = new Carte(idCarteStatic, "Capitaine", val, "", -1, "assets/img/capitaine_"+couleur+".png"); //Un truc dans le genre
	idCarteStatic++;
	return c;
}

function newAmiral(val){
	var a = new Carte(idCarteStatic, "Amiral", val, "", -1, "assets/img/amiral.png"); //Un truc dans le genre
	idCarteStatic++;
	return a;
}

/**
	créer un packets de carte rangée dans l'ordre, contenant toutes les cartes classiques du jeu
	@return un array avec les cartes
*/
function creerPaquets(){
	
}


