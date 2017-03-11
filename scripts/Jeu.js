var pioche= [];
var batailles = [];
var joueurs = []; //array de joueur, indice 0 c'est nous
var idJoueurActif = 0 ; //celui qui est en train de jouer
var nbActionJoueur = [0,0];

var initDuJeu = 1;


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
        place = alea(0, pioche.length-1);
        constante = pioche[i];
        pioche[i] = pioche[place];
        pioche[place] = constante;
    }
}


function initPioche(){
    isPaused = true;

    var v = document.getElementById("piocheImg");
    this.pioche= creerPaquet();
    
    for(var i=0; i < pioche.length; i++){
        staticPaquet.push(pioche[i]);
    }
    
    melangerPioche(this.pioche);
    v.onclick = piocherCarte;
    v.onmouseover = piocheMouseOver;
    v.onmouseout = piocheMouseOut;
    isPaused=false;

}

function piocherCarte(){
    if(initDuJeu==0){
        alert("pioche mais pas init");
        nbActionJoueur[idJoueurActif]--;
    }
    isPaused=true;
    var carte = pioche[pioche.length-1];
    
    joueurs[idJoueurActif].cartesEnMain.push(pioche[pioche.length-1]);
    pioche[pioche.length-1].idJoueur = joueurs[idJoueurActif].idJoueur;
    
    pioche.pop();

	AffichagePiocherCarte(carte);
    
    if(initDuJeu==0){
        nextFunction(finDeTour);
    }
    isPaused=false;
    
}

function initJoueurs(){ //associer actionJoueur() au onClick onKeyDown
    isPaused = true;

    var ia = [null, newIA_easy(joueurs[1])];
    for(var j = 0; j < 2; j++){
        idJoueurActif = j;
        joueurs.push(newJoueur([], null, ia[j]));
        //sleep(900);
        for (var i=0;i<6;i++){
            piocherCarte();
        }
    }
    isPaused=false;

}

function initJeu(){
    initPioche();
    setTimeout(initJoueurs, 1000);
    idJoueurActif=0;
    nbActionJoueur[idJoueurActif]++;
    initDuJeu=0;
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
    
    idJoueurActif=1-idJoueurActif; //switch joueur
    nbActionJoueur[idJoueurActif]++;
    if(idJoueurActif==1){// appel IA
    if(isPaused==false){
        piocherCarte();
    }
        
    }
}

function finDeTourDeJeu(){ //est parfois appelé par finDeTour quand on a fini le tour de chaque joueurs
    alert("fin de tour de jeu");

    if(isPartieFinie()){ //
        afficheFinPartie();					//Une fonction pour finir le jeu?
    }
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
        nextFunction(finDeTour);
    }else{
        selectionnerCarte(carte);
    }
}

function poserPirate(event){ //bataille, carte
    nbActionJoueur[idJoueurActif]--;

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
                /*	console.log("Je viens de poser un PIIIRATE !");
                 return true;
                 } else { //si on a pas réussi à ajouter la carte
                 console.log("Echec de posage de carte sur bataille");
                 return false;
                 }*/
            }
        }
    }
    nextFunction(finDeTour);
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
    } else{
        var isCartePlayed = false;
        
        if(carte.type=="Galion"){
            poserGalion(carte);
        }
        else if(carte.type=="Pirate"){
            var objet = {target : {id : carte.idCarte}};
            poserPirate(objet);
        }
        else if(carte.type=="Amiral"){
            poserAmiral();
        }
        else if(carte.type=="Capitaine"){
            poserCapitaine();
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
	setTimeout(funct, 50);
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
