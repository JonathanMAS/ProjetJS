var size = {
width: document.body.clientWidth ,
height: document.body.clientHeight
};


function removeCarteMainJoueur(id){
    if(idJoueurActif==0){
    var main = document.getElementById("main");
    }else{
    var main = document.getElementById("main_adverse");
    }
    for(var i=0;i<main.childNodes.length;i++){
        if(id == main.childNodes[i].id){
            main.removeChild(main.childNodes[i]);
        }
    }
}

function removeBataille(id){
    var batailles = document.getElementById("batailles");
    for(var i=0;i<batailles.childNodes.length;i++){
        if(id == batailles.childNodes[i].id){
            batailles.removeChild(batailles.childNodes[i]);
        }
    }
}

function AffichagePiocheVide(){
    var v = document.getElementById("piocheImg");
    v.src= "res/cartes/pass.png";
    v.onclick = finDeTour;
    v.onmouseover = piocheMouseOver;
    v.onmouseout = piocheMouseOut;
}

function assignScore(id, score){
    if(id==0){
        document.getElementById("score_joueur").innerHTML = score;
    }else{
        document.getElementById("score_advers").innerHTML = score;
    }
}

function updateCarteMainAdversaire(){
    var advers = document.getElementById("main_adverse");
    advers.style.marginTop = "-150px";
    var cartesMain = joueurs[1].cartesEnMain;
    var img = document.createElement("img");
    img.src = "res/cartes/carte.png";
    img.id = cartesMain[cartesMain.length-1].idCarte;
    img.width=150;
    img.style.opacity = "0.7";
    img.style.padding = "10px";
    advers.appendChild(img);
 //   assignCarte(joueurs[1].cartesEnMain[cartesMain.length-1]);

}

function updateCarteMainJoueur(){
    var main = document.getElementById("main");
    var cartesMain = joueurs[0].cartesEnMain;
    var img = document.createElement("img");
    img.src = cartesMain[cartesMain.length-1].cheminImage;
    img.id = cartesMain[cartesMain.length-1].idCarte;
    img.width=150;
    img.style.opacity = "0.7";
    img.style.padding = "10px";
    main.appendChild(img);
    assignCarte(joueurs[0].cartesEnMain[cartesMain.length-1]);
}

function creerNouvelleBataille(object){
    var fieldGame= document.getElementById("batailles");
    var bataille = document.createElement("div");
    bataille.className="bataille";
    bataille.id = object.idBataille;
    fieldGame.appendChild(bataille);
    var galion = document.createElement("img");
    galion.src = object.galion.cheminImage;
    galion.id =object.galion.idCarte;
    galion.width= 150;
    galion.style.zIndex = "999";
    galion.style.position = "relative";
    bataille.appendChild(galion);
   // bataille.onClick = poserCarte;
}


function ajouterAffichageCarteBataille(bataille,carte){
    var bataille_div = document.getElementById(bataille.idBataille);
    var img = document.createElement("img");
    img.src = carte.cheminImage;
    img.id = carte.idCarte;
    img.width=150;
    img.style.opacity = "0.7";
    img.style.position = "relative";
    img.style.opacity = "1";
    img.style.zIndex= 999 - bataille.listeCarte.length;

    if(carte.idJoueur==0){
        img.style.marginLeft = "-90px";
        bataille_div.appendChild(img);
    }else{
        img.style.marginRight = "-90px";
        bataille_div.insertBefore(img, bataille_div.firstChild);
    }
}


function selectCarte(id){
	var v = document.getElementById(id);
	v.style.opacity = "1";
}
function unselectCarte(id){
    var v = document.getElementById(id);
	v.style.opacity = "0.5";
}

function carteMouseOver(evt){
	var v = document.getElementById(evt.target.id);
	v.style.transition = "width 0.5s";
	v.width = 160;
	//console.log(findCarte(evt.target.id));
}
function carteMouseOut(evt){
	var v = document.getElementById(evt.target.id);
	v.width = 150;
}

function piocheMouseOver(evt){
	var v = document.getElementById(evt.target.id);
	v.style.opacity = "1";
	//v.style.border = "solid 1px";
	//v.style.borderRadius = "8px";
	console.log(findCarte(evt.target.id));
}
function piocheMouseOut(evt){
	var v = document.getElementById(evt.target.id);
	v.style.opacity = "0.85";
	//v.style.borderRadius = "8px";
}

function defineFieldGame(){
    var fieldGame = document.getElementById("fieldGame");
    var fieldPiocheScore = document.getElementById("fieldPiocheScore");
    fieldGame.style.width = size.width - fieldPiocheScore.clientWidth + 'px';
}

/*function afficherPioche(){
    var pioche = document.getElementById("pioche");
    var dim = ((size.height-300) - pioche.clientHeight)/2 ;
    var fieldPioche = document.getElementById("fieldPiocheScore");
    fieldPioche.style.paddingTop = dim + 'px';
    fieldPioche.style.marginTop = - dim + 'px';
    fieldPioche.style.paddingBottom =dim + 'px';
}*/


function AffichagePiocherCarte(){
    if(idJoueurActif==0){
    updateCarteMainJoueur();
    }else{
    updateCarteMainAdversaire();
    }
}
