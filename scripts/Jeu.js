var pioche= [];
var batailles = [];
var joueurs = []; //array de joueur, indice 0 c'est nous
var idJoueurActif = 0 ; //celui qui est en train de jouer
var nbActionJoueur = [1,0];
var initialisation=1;

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
    while(isPaused){
        waitForIt();
    }
    initialisation=0;
}
function resize(){
    afficherPioche();
    defineFieldGame();
}

function melangerPioche(){
    var place = 0;
    var constante;
    for(var i = 0; i < pioche.length; i++){
        place = alea(0, pioche.length-1);
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
    isPaused=true;
    if(nbActionJoueur[idJoueurActif]==1){
    var carte = pioche[pioche.length-1];
    
    joueurs[idJoueurActif].cartesEnMain.push(pioche[pioche.length-1]);
    pioche[pioche.length-1].idJoueur = joueurs[idJoueurActif].idJoueur;
    
    pioche.pop();

	AffichagePiocherCarte(carte);
    
    finDeTour();
    }
    isPaused=false;
}

function initJoueurs(){ //associer actionJoueur() au onClick onKeyDown

    var ia = [null, newIA_easy(joueurs[1])];
    for(var j = 0; j < 2; j++){
       // idJoueurActif = j;
        joueurs.push(newJoueur([], null, ia[j]));
        //sleep(900);
    }
    for (var i=0;i<12;i++){
        piocherCarte();
        while(isPaused){
            waitForIt();
        }
    }
}

function initJeu(){
    isPaused=true;
    initPioche();
    initJoueurs();
    isPaused=false;
  //  idJoueurActif=0;
}

function afficheFinPartie(){
	alert("BRAVO ! Vous avez PER - DU ! M'en fiche, c'est moi l'boss, je décide que tu as perdu, MOUHAHAHAHAHAHAHAHAHAHAHA *Rire qui n'en finis plus* !");
}

function isPartieFinie(){ //pioche.size = 0, un des joueurs n'a plus de carte en main
    if(pioche.size==0 && (joueurs[0].cartesEnMain==null||joueurs[1].cartesEnMain==null)){
        return true;
    }else{
        return false;
    }
}

function finDeTour(){ //donne la main au joueurSuivant, isBataillesGagnant(), isPartieFinie()
    nbActionJoueur[idJoueurActif]--;
    idJoueurActif=1-idJoueurActif; //switch joueur
    nbActionJoueur[idJoueurActif]++;
    if(idJoueurActif==1&&initialisation!=1){
        joueurs[idJoueurActif].IA.play();
    }
    if(idJoueurActif==0){
        finDeTourDeJeu();
    }

}

function finDeTourDeJeu(){ //est parfois appelé par finDeTour quand on a fini le tour de chaque joueurs
   // alert("fin de tour de jeu");

  /*  if(isPartieFinie()){ //
        afficheFinPartie();					//Une fonction pour finir le jeu?
    } */
}

function waitForIt(){
    while(isPaused) {
        setTimeout(function(){waitForIt()},100);
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
   // alert("tentative pose d'un galion");

    nbActionJoueur[idJoueurActif]--;

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
        finDeTour();
        return 1;
    }else{
        selectionnerCarte(carte);
    }
    return 0;
}

function poserPirate(event){ //bataille, carte
   // alert("tentative pose d'un pirate");
    nbActionJoueur[idJoueurActif]--;
    var a_jouer=0;
    //TODO verifier que la carte selectionnée est bien un pirate et que le galion de la bataille existe bien
    var j =joueurs[idJoueurActif];
    var idGalion = event.target.id;
    if(j.carteSelectionne.type == "Pirate"){
        var b = findBataille(idGalion);
        if(b!=null){
            console.log("Tentatives de posage de pirate : ");
            if(b.addCarte(j.carteSelectionne)){ //si on a réussi à ajouter la carte
                var v = document.getElementById(joueurs[idJoueurActif].carteSelectionne.idCarte);
                unselectCarte(joueurs[idJoueurActif].carteSelectionne.idCarte);
                j.supprimerCarteEnMain(j.carteSelectionne.idCarte);
                removeCarteMainJoueur(j.carteSelectionne.idCarte);
                joueurs[idJoueurActif].carteSelectionne = null;
                v.style.opacity = "1";
                a_jouer=1;

                /*	console.log("Je viens de poser un PIIIRATE !");
                 return true;
                 } else { //si on a pas réussi à ajouter la carte
                 console.log("Echec de posage de carte sur bataille");
                 return false;
                 }*/
            }
        }
    }
    finDeTour();
    return a_jouer;
}

function poserAmiral(bataille,carte){ //bataille, carte
    alert("amiral");
    return 0; //l'amiral n'as pas été posé
}

function poserCapitaine(bataille,carte){ //bataille, carte
    alert("capitaine");
    return 0; //le capitaine n'as pas été posé
}

function poserCarte(evt){
    isPaused= true;
    var joue = 0;

    //var v = document.getElementById(evt.target.id);
    var carte = findCarte(evt.target.id);
    //alert(carte);
    var j =joueurs[idJoueurActif];
    if(j.carteSelectionne != carte){
        selectionnerCarte(carte);
    } else{
        
        if(carte.type=="Galion"){
            joue= poserGalion(carte);
        }
        else if(carte.type=="Pirate"){
            var objet = {target : {id : carte.idCarte}};
            joue = poserPirate(objet);
        }
        else if(carte.type=="Amiral"){
            joue = poserAmiral();
        }
        else if(carte.type=="Capitaine"){
            joue = poserCapitaine();
        }
        
    }
    isPaused= false;

    return joue;
    
}


function selectionnerCarte(carte){ //carte
    isPaused=true;
    if(joueurs[idJoueurActif].carteSelectionne != null)
        unselectCarte(joueurs[idJoueurActif].carteSelectionne.idCarte);
    joueurs[idJoueurActif].carteSelectionne= carte;
    selectCarte(carte.idCarte);
    isPaused=false;
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
    var v = document.getElementById(carte.idCarte);
    v.style.transition = "width 0.5s";
    v.onmouseover = carteMouseOver;
    v.onmouseout = carteMouseOut;
    v.onclick = poserCarte;
}


