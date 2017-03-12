﻿var idBatailleStatic = 0;

function Bataille(id, listeCarte, galion){
    this.idBataille = id;
	this.listeCarte = listeCarte;
	this.galion = galion;
	this.carteByColor = [[], [], [], []]; // rouge vert bleu jaune
	
	this.ROUGE = 0; //à ne pas modifier
	this.VERT = 1;
	this.BLEU = 2;
	this.JAUNE = 3;
	
	this.batailleGagnante = function(){ //renvoie l'id du Joueur qui gagne à un instant donné ou -1 si égalité
		
		//permet de trier les cartes par joueur pour calculer ses points
		var joueurs = []; //contient les id des joueurs qui ont participés à la bataille dans l'odre de leur couleur
		var pointsJoueurs = []; //
		//si la dernière carte la plus forte posée apartient au joueur courant, il gagne la bataille
		
		//on cherche un amiral :
		if(this.listeCarte[0].type == "Amiral"){ 
			return this.listeCarte[0].idJoueur; //celui qui pose l'amiral est forcément le gagnant
		} else if(this.listeCarte[0].type == "Capitaine"){
			//TODO gérer le cas des capitaines dans Jeu.js
			return this.listeCarte[0].idJoueur; //TODO à verifier : le dernier capitaine posé est gagnant
		}else{
			for(var i=0; i < this.carteByColor.length; i++){ //on compte les points pour chaque joueur
				if(this.carteByColor[i].length != 0){ //s'il y a au moins une carte de cette couleur
					joueurs.push(this.carteByColor[i][0].idJoueur); //on retient quel joueurs ont participé
					for(var j=0; j < this.carteByColor[i].length; j++){ //pour chaque carte de couleur
						pointsJoueurs[i] += this.carteByColor[i][j].valeur; //on ajoute le score du joueur
					}

				}
			}
			var joueurGagnant = 0;
			for(var i=0; i < pointsJoueurs.length; i++){ //on cherche le joueur qui a le plus de points
				if(pointsJoueurs[i] >= pointsJoueurs[joueurGagnant]){
					joueurGagnant = i;
				}
			}
			for(var i=0; i < pointsJoueurs.length; i++){ //on cherche si le joueur qui a le plus de points est ex aequo
				if(pointsJoueurs[i] == pointsJoueurs[joueurGagnant]){
					return -1;
				}
			}
			return joueurs[joueurGagnant];
			
		}
		
		
	}
	
	//Ajoute les cartes pirates en fin de tas, les capitaine en début, et l'amiral avant les capitaines ET les pirates
	this.addCarte = function(carte){ //retourn true si la carte a bien été posée
		//verifier si le joueur n'as pas déjà posé une carte avec une couleur différente
		var idTas = 0; //on définis id du tas à modifier en fonction de la couleur
		//carte = joueurs[idJoueurActif].carteSelectionne;
		if(carte.couleur == "rouge"){
			idTas = this.ROUGE;
		} else if(carte.couleur == "vert"){
			idTas = this.VERT;
		} else if(carte.couleur == "bleu"){
			idTas = this.BLEU;
		} else if(carte.couleur == "jaune"){
			idTas = this.JAUNE;
		}
        
        var MaCouleur = -1;
        
        for(var i=0;i<this.carteByColor.length;i++){
            if(this.carteByColor[i].length!=0){
                if(this.carteByColor[i][0].idJoueur==idJoueurActif){
                    MaCouleur= i;
                }
            }
        }
        if(idTas!=MaCouleur&&MaCouleur!=-1){
            if(idJoueurActif==0){
            alert("Tu ne peux pas jouer cette carte pour une de ces deux raisons: \n - un autre joueur utilise déja cette couleur\n - tu utilises déjà une autre couleur ");
            }
            if(carte.type == "Amiral"){
                this.listeCarte.unshift(carte); //on ajoute la carte
                return true;
            }
            return false;
        }else{
            if(carte.type == "Capitaine"){
                this.listeCarte.unshift(carte); //on ajoute le capitaine en début de tableau
                this.carteByColor[idTas].unshift(carte); //on ajoute le capitaine en début de tableau
            } else if(carte.type == "Amiral"){
                this.listeCarte.unshift(carte); //on ajoute la carte
            } else { //carte générale
                ajouterAffichageCarteBataille(this,carte);
                this.listeCarte.push(carte); //on ajoute la carte en fin
                this.carteByColor[idTas].push(carte); //on ajoute la carte en fin
            }
            return true;
        }
    }
    
	this.getScoreJoueur = function(idJoueur){ //retourne le nombre de points de pirates pour le joueur donné
		var idTas = 0;
		for(var i=0; i < 4; i++){
			if(this.carteByColor[i].length != 0){
				//console.log("Joueur : "+this.carteByColor[i][0].idJoueur+" == "+idJoueur+" ?");
				
				if(this.carteByColor[i][0].idJoueur == idJoueur){
					//console.log("Calcul score ...");
					var score = 0;
					for(var j = 0; j < this.carteByColor[i].length; j++){
						score += this.carteByColor[i][j].valeur;
					}
					//console.log("score : "+score);
					return score;
				}
			}
		}
		
		return 0; //score non trouvé
	}
}

function newBataille(galion){
	var b = new Bataille("Bataille_"+idBatailleStatic,[galion], galion);
    idBatailleStatic++;
    creerNouvelleBataille(b);
	return b;
}

//var bataille = [];
//bataille[i].batailleGagnante();











