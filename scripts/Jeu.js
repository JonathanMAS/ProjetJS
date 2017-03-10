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
    
    joueurs[idJoueurActif].cartesEnMain.push(pioche[pioche.length-1]);
    pioche[pioche.length-1].idJoueur = joueurs[idJoueurActif].idJoueur;
    
    pioche.pop();

	AffichagePiocherCarte(carte);
}

function initJoueurs(){ //associer actionJoueur() au onClick onKeyDown
    	
	
	for(var j = 0; j < 2; j++){
		idJoueurActif = j;
        	joueurs.push(newJoueur([], null));
		for (var i=0;i<6;i++){
			piocherCarte();
		}
	}
}

function initJeu(){
    initPioche();
	initJoueurs();
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
	if(idJoueurActif==joueurs[0].idJoueur){
		idJoueurActif=joueurs[1].idJoueur;
	}else{
		finDeTourDeJeu();
	}
}


function finDeTourDeJeu(){ //est parfois appelé par finDeTour quand on a fini le tour de chaque joueurs
	if(isPartieFinie()){
		afficheFinPartie();					//Une fonction pour finir le jeu?
	}else{
		idJoueurActif=joueurs[0].idJoueur;
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
    }else{
        selectionnerCarte(carte);
    }
}

function poserPirate(carte){ //bataille, carte
    //alert("pirate");
	
	//TODO verifier que la carte selectionnée est bien un pirate et que le galion de la bataille existe bien 
	var j =joueurs[idJoueurActif];
	var idGalion = carte.target.id;
	
	if(j.carteSelectionne.type == "Pirate"){
		//alert("pouet");
		var b = findBataille(idGalion);
		console.log("Tentatives de posage de pirate : ");
		if(b.addCarte(carte)){ //si on a réussi à ajouter la carte
			unselectCarte(joueurs[idJoueurActif].carteSelectionne.idCarte);
			j.supprimerCarteEnMain(j.carteSelectionne.idCarte);
			removeCarteMainJoueur(j.carteSelectionne.idCarte);
			joueurs[idJoueurActif].carteSelectionne = null;
		} else { //si on a pas réussi à ajouter la carte
			console.log("Echec de posage de carte sur bataille");
		}
		
	}
	
	
    // add carte on bataille
}

function poserAmiral(bataille,carte){ //bataille, carte
    //alert("amiral");

//	bataille.addCarte(carte);
}

function poserCapitaine(bataille,carte){ //bataille, carte
    //alert("capitaine");
	//bataille.addCarte(carte);
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

function poserCarte(evt){
	//var v = document.getElementById(evt.target.id);
	var carte = findCarte(evt.target.id);
	var j =joueurs[idJoueurActif];
	if(j.carteSelectionne != carte){
		selectionnerCarte(carte);
		console.log(carte);
	} else{
		if(carte.type=="Galion"){
			poserGalion(carte);
		}
		if(carte.type=="Pirate"){
			poserPirate(carte);
		}
		if(carte.type=="Amiral"){
			poserAmiral();
		}
		if(carte.type=="Capitaine"){
			poserCapitaine();
		}
	}
	

}


function assignCarte(carte){
	//console.log(carte);
	
	var v = document.getElementById(carte.idCarte);
	v.style.transition = "width 0.5s";
	v.onmouseover = carteMouseOver;
	v.onmouseout = carteMouseOut;
	v.onclick = poserCarte;
}



/*function actionJoueur(){
    // piocher, selectionnerCarte, jouerCarte; appel finDeTour()
}*/
