var pioche= [];
var batailles = [];
var joueurs = []; //array de joueur, indice 0 c'est nous
var idJoueurActif = 0 ; //celui qui est en train de jouer

//paquets qui doit contenir toutes les cartes du jeu pour pouvoir les référencer. 
//On ne doit pas enlever ou ajouter de carte à ce paquets ormis lors de l'initialisation
var staticPaquet = [];

document.body.onload = start;
document.body.onresize = resize;


function alea(min, max){
	return Math.floor(Math.random()*(max-min+1)+min) ;
}

function start(){
    defineFieldGame();
    afficherPioche();
    initJeu();
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
	var v = document.getElementById("piocheImg");
	this.pioche= creerPaquet();
  
	for(var i=0; i < pioche.length; i++){
		staticPaquet.push(pioche[i]);
	}
  
	melangerPioche(this.pioche);
	v.onclick = piocherCarte;
	v.onmouseover = piocheMouseOver;
	v.onmouseout = piocheMouseOut;
 }

function piocherCarte(){
	
    var carte = pioche[pioche.length-1];
    
	//console.log(joueurs);
	//console.log(idJoueurActif);
	//console.log(pioche);
	
    joueurs[idJoueurActif].cartesEnMain.push(pioche[pioche.length-1]);
    pioche[pioche.length-1].idJoueur = joueurs[idJoueurActif].idJoueur;
    
    pioche.pop();

	AffichagePiocherCarte(carte);
}

function initJoueurs(){ //associer actionJoueur() au onClick onKeyDown
		
	var ia = [null, newIA_easy(joueurs[1])];
	for(var j = 0; j < 2; j++){
		idJoueurActif = j;
        joueurs.push(newJoueur([], null, ia[j]));
		//sleep(900);
		for (var i=0;i<6;i++){
			piocherCarte();
		}
	}
}

function initJeu(){
    initPioche();
	setTimeout(initJoueurs, 1500);
    idJoueurActif=0;
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
	if(idJoueurActif==joueurs[0].idJoueur){ //on switch de joueur
		idJoueurActif=joueurs[1].idJoueur;
		if(joueurs[idJoueurActif].IA != null){ //si le joueur actuel est une IA
			joueurs[idJoueurActif].IA.play(); // on laisse l'IA jouer
		}
	}else{ //si on a atteind le dernier joueur
		finDeTourDeJeu();
	}
}

function finDeTourDeJeu(){ //est parfois appelé par finDeTour quand on a fini le tour de chaque joueurs
	if(isPartieFinie()){ //
		afficheFinPartie();					//Une fonction pour finir le jeu?
	}else{
		idJoueurActif=joueurs[0].idJoueur; // on recommence par le premier joueur
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

    if(joueurs[idJoueurActif].carteSelectionne!=null&&(joueurs[idJoueurActif].carteSelectionne.idCarte==carte.idCarte)){ //si une carte est selectionnée
        //alert("newBataille");
		var j =joueurs[idJoueurActif];
        batailles.push(newBataille(j.carteSelectionne)); //on crée une battaille dont le galion selectionnée est donné

		var v = document.getElementById(carte.idCarte);
		v.onclick = poserPirate;
		v.onmouseover = carteMouseOver;
		v.onmouseout = carteMouseOut;
		
		unselectCarte(joueurs[idJoueurActif].carteSelectionne.idCarte);
		
		//alert(j.supprimerCarteEnMain(carte.idCarte));
		removeCarteMainJoueur(carte.idCarte);
		joueurs[idJoueurActif].carteSelectionne = null;
       // idJoueurActif= 1 - idJoueurActif;
        v.style.opacity = "1";
	   return true;
    }else{
        selectionnerCarte(carte);
		return false;
    }
}

function poserPirate(event){ //bataille, carte
	
	//TODO verifier que la carte selectionnée est bien un pirate et que le galion de la bataille existe bien 
	var j =joueurs[idJoueurActif];
    var idGalion = event.target.id;
    if(j.carteSelectionne.type == "Pirate"){
		var b = findBataille(idGalion);
		console.log("Tentatives de posage de pirate : ");
		if(b.addCarte(j.carteSelectionne)){ //si on a réussi à ajouter la carte
			var v = document.getElementById(joueurs[idJoueurActif].carteSelectionne.idCarte);
			
			unselectCarte(joueurs[idJoueurActif].carteSelectionne.idCarte);
			j.supprimerCarteEnMain(j.carteSelectionne.idCarte);
			removeCarteMainJoueur(j.carteSelectionne.idCarte);
			joueurs[idJoueurActif].carteSelectionne = null;
            v.style.opacity = "1";
			return true;
		} else { //si on a pas réussi à ajouter la carte
			console.log("Echec de posage de carte sur bataille");
			return false;
		}
	}
	
	return false;
    // add carte on bataille
}

function poserAmiral(bataille,carte){ //bataille, carte
    //alert("amiral");
	return false; //l'amiral n'as pas été posé
}

function poserCapitaine(bataille,carte){ //bataille, carte
    //alert("capitaine");
	return false; //le capitaine n'as pas été posé
}

function poserCarte(evt){
	//var v = document.getElementById(evt.target.id);
	var carte = findCarte(evt.target.id);
	var j =joueurs[idJoueurActif];
	if(j.carteSelectionne != carte){
		selectionnerCarte(carte);
		console.log(carte);
	} else{
		var isCartePlayed = false;
		console.log("Carte jouée ? ");
		
		if(carte.type=="Galion"){
			isCartePlayed = poserGalion(carte);
		}
		else if(carte.type=="Pirate"){
			var objet = {target : {id : carte.idCarte}};
			isCartePlayed = poserPirate();
		}
		else if(carte.type=="Amiral"){
			isCartePlayed = poserAmiral();
		}
		else if(carte.type=="Capitaine"){
			isCartePlayed = poserCapitaine();
		}
		console.log(isCartePlayed);
		if(isCartePlayed){
			nextFunction(finDeTour);
		}
	}
	

}


function selectionnerCarte(carte){ //carte
	console.log("Carte selected");
	
	if(joueurs[idJoueurActif].carteSelectionne != null)
		unselectCarte(joueurs[idJoueurActif].carteSelectionne.idCarte);
    joueurs[idJoueurActif].carteSelectionne= carte;
    selectCarte(carte.idCarte);
}


function findCarte(idCarte){
	
	for(var i=0; i < staticPaquet.length; i++){
		if(staticPaquet[i].idCarte == idCarte){
			return staticPaquet[i];
		}
	}
	return null;
}

function findBataille(idGalion){
		for(var i=0; i < batailles.length; i++){
			if(batailles[i].galion.idCarte == idGalion){
				return batailles[i];
		}
	}
	return null;
}



function assignCarte(carte){
	//console.log(carte);
	
	var v = document.getElementById(carte.idCarte);
	v.style.transition = "width 0.5s";
	v.onmouseover = carteMouseOver;
	v.onmouseout = carteMouseOut;
	v.onclick = poserCarte;
}

function nextFunction(funct){
	setTimeout(funct, 750);
}

function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}
/*function actionJoueur(){
    // piocher, selectionnerCarte, jouerCarte; appel finDeTour()
}*/
