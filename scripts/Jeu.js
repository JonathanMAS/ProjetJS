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
    afficherPaquetsJoueurs();
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
  this.pioche= creerPaquet();
  
  for(var i=0; i < pioche.length; i++){
	  staticPaquet.push(pioche[i]);
  }
  
  melangerPioche(this.pioche);
 }

function piocherCarte(){
	var carte = pioche[pioche.length-1];
	//var mains = joueurs[idJoueurActif].cartesEnMain.length;
	joueurs[idJoueurActif].cartesEnMain.push(pioche[pioche.length-1]);
	//console.log(joueurs[idJoueurActif].cartesEnMain);
	pioche[pioche.length-1].idJoueur = joueurs[idJoueurActif].idJoueur;
    pioche.pop();
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
    if(joueurs[idJoueurActif].carteSelectionne!=null&&(joueurs[idJoueurActif].carteSelectionne.idCarte==carte.idCarte)){
        alert("newBataille");
        batailles.push(newBataille(joueurs[idJoueurActif].carteSelectionne));
        for(var i=0;i<joueurs[idJoueurActif].cartesEnMain.length;i++){
            if(joueurs[idJoueurActif].cartesEnMain[i].idCarte==carte.idCarte){
                joueurs[idJoueurActif].cartesEnMain.splice(i,1);
                removeCarteMainJoueur(carte.idCarte);
            }
        }
       // idJoueurActif= 1 - idJoueurActif;
    }else{
        selectionnerCarte(carte);
    }
}

function poserPirate(carte){ //bataille, carte
    //alert("pirate");
    if(Bataille == typeof carte){
        alert(carte);
        carte.addCarte(this.carteSelectionne);
    }else{
        alert(typeof carte);
        selectionnerCarte(carte);
    }
    // add carte on bataille
}

function poserAmiral(bataille,carte){ //bataille, carte
    alert("amiral");

//	bataille.addCarte(carte);
}

function poserCapitaine(bataille,carte){ //bataille, carte
    alert("capitaine");
	//bataille.addCarte(carte);
}

function selectionnerCarte(carte){ //carte
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

function poserCarte(evt){
	//var v = document.getElementById(evt.target.id);
	var carte = findCarte(evt.target.id)
	console.log(carte);
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
