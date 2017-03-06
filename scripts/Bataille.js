﻿
function Bataille(listeCarte, galion){
	this.listeCarte = listeCarte;
	this.galion = galion;
	this.carteByColor = [[], [], [], []]; // rouge vert bleu jaune
	this.derniereCartePose = galion;
	this.avantDerniereCartePose = galion;
	
	this.ROUGE = 0; //à ne pas modifier
	this.VERT = 1;
	this.BLEU = 2;
	this.JAUNE = 3;
	
	this.batailleGagnante = function(){ //renvoie l'id du Joueur qui gagne à un instant donné ou -1 si égalité
		
		//permet de trier les cartes par joueur pour calculer ses points
		var joueurs = []; //
		var cartes = []; //
		//si la dernière carte la plus forte posée apartient au joueur courant, il gagne la bataille
		
		//on cherche un amiral :
		if(this.listeCarte[0].type == "Amiral"){ 
			return this.listeCarte[0].idJoueur; //celui qui pose l'amiral est forcément le gagnant
		} else if(this.listeCarte[0].type == "Capitaine"){
			if(this.avantDerniereCartePose = this.listeCarte[0].
			return this.listeCarte[0].idJoueur; //TODO à verifier : le dernier capitaine posé est gagnant
		}else{
			for(var i=0; i < this.carteByColor.length; i++){ //on compte les points pour chaque joueur
				if(this.carteByColor[i].length != 0){ //s'il y a au moins une carte de cette couleur
					joueurs.push(this.carteByColor[i][0].idJoueur);
					for(var j=0; j < this.carteByColor[i].length; j++){ //pour chaque carte de couleur
						
					}

				}
			}
		}
		
		
		
	}
	
	//Ajoute les cartes pirates en fin de tas, les capitaine en début, et l'amiral avant les capitaines ET les pirates
	this.addCarte = function(carte){ //retourn true si la carte a bien été posée
		//verifier si le joueur n'as pas déjà posé une carte avec une couleur différente
		var idTas = 0; //on définis id du tas à modifier en fonction de la couleur
		if(carte.couleur == "rouge"){
			idTas = this.ROUGE;
		} else if(carte.couleur == "vert"){
			idTas = this.VERT;
		} else if(carte.couleur == "bleu"){
			idTas = this.BLEU;
		} else if(carte.couleur == "jaune"){
			idTas = this.JAUNE;
		}
		
		if(this.carteByColor[idTas].length == 0){ //si la couleur n'est pas utilisée 
		
			if(carte.type == "Capitaine"){
				this.listeCarte.unshift(carte); //on ajoute le capitaine en début de tableau
				this.carteByColor[idTas].unshift(carte); //on ajoute le capitaine en début de tableau
			} else if(carte.type == "Amiral"){
				this.listeCarte.unshift(carte); //on ajoute la carte
			} else { //carte générale
				this.listeCarte.push(carte); //on ajoute la carte en fin
				this.carteByColor[idTas].push(carte); //on ajoute la carte en fin
			}
			
		} else { //sinon, si la couleur appartient à un joueur
			if(this.carteByColor[idTas][0].idJoueur == carte.idJoueur){ //et que c'est le joueur actuel
				
				if(carte.type == "Capitaine"){
					this.listeCarte.unshift(carte); //on ajoute le capitaine en début de tableau
					this.carteByColor[idTas].unshift(carte); //on ajoute le capitaine en début de tableau
				} else if(carte.type == "Amiral"){
					this.listeCarte.unshift(carte); //on ajoute la carte
				} else { //carte générale
					this.listeCarte.push(carte); //on ajoute la carte en fin
					this.carteByColor[idTas].push(carte); //on ajoute la carte en fin
				}
			} else {
				return false; //si la couleur qu'on essaie de poser ne nous appartient pas, on ne pose pas la carte
			}
		}
		
		this.avantDerniereCartePose = this.derniereCartePose;
		this.derniereCartePose = carte;
		return true;
	}
}

function newBataille(galion){
	var b = new Bataille([galion], galion); 
	return b;
}

var bataille = [];
bataille[i].batailleGagnante();











