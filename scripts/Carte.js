
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

function newCapitaine(couleur){
	var c = new Carte(idCarteStatic, "Capitaine", null, couleur, -1, "assets/img/capitaine_"+couleur+".png"); //Un truc dans le genre
	idCarteStatic++;
	return c;
}

function newAmiral(){
	var a = new Carte(idCarteStatic, "Amiral", null, "", -1, "assets/img/amiral.png"); //Un truc dans le genre
	idCarteStatic++;
	return a;
}

/**
	créer un packets de carte rangée dans l'ordre, contenant toutes les cartes classiques du jeu
	@return un array avec les cartes
*/
//fait par Sandra
function creerPaquets(){
	var paquet = new Array();
	
	//Cartes galion
	for(var i = 2; i <= 8; i++){
		if(i == 2 || i == 4 || i == 5){					//Cinq cartes Galion de valeur 2, 4 et 5
			for(var j = 1; j <= 5; i++){
				paquet.push(newGalion(i));
			}
		}
		
		if(i == 3){										//Six cartes Galion de valeur 3
			for(var j = 1; j <= 6; i++){
				paquet.push(newGalion(i));
			}
		}
		
		if(i == 6){										//Deux cartes Galion de valeur 6
			for(var j = 1; j <= 2; i++){
				paquet.push(newGalion(i));
			}
		}
		
		if(i == 7 || i == 8){							//Une carte Galion de valeur 7 et 8
			paquet.push(newGalion(i));
		}
	}
	
	var couleurs = ["jaune", "rouge", "vert", "bleu"];
	
	for(var k=0; k < couleurs.length; i++){
		//Cartes pirates JAUNES
		for(var i = 1; i <= 4; i++){
			if(i == 1 || i == 4){
				for(var j = 1; j <= 2; j++){
					paquet.push(newPirate(i, couleurs[k]);
				}
			}
			else{
				for(var j = 1; j <= 4; j++){
					paquet.push(newPirate(i, couleurs[k]);
				}
			}		
		}
		paquet.push(newCapitaine(couleurs[k]));
	}
	
	//Carte amiral
	paquet.push(newAmiral());
	
	return paquet;
}


