var size = {
width: document.body.clientWidth ,
height: document.body.clientHeight
};


function removeCarteMainJoueur(id){
    var main = document.getElementById("main");
    for(var i=0;i<main.childNodes.length;i++){
        if(id == main.childNodes[i].id){
            main.removeChild(main.childNodes[i]);
        }
    }
}


function updateCarteMainAdversaire(){
    var advers = document.getElementById("main_adverse");
    advers.style.marginTop = "-150px";
    document.getElementById("center").style.marginTop = "100px";
    var cartesMain = joueurs[1].cartesEnMain;
    var img = document.createElement("img");
    img.src = "res/cartes/carte.png";
    img.id = cartesMain[cartesMain.length-1].idCarte;
    img.width=150;
    img.style.opacity = "0.7";
    img.style.padding = "10px";
    advers.appendChild(img);
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
    var fieldGame= document.getElementById("fieldGame");
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
    bataille.onClick = poserCarte;
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
        bataille_div.insertBefore(img, bataille.firstChild);
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
	console.log(findCarte(evt.target.id));
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
    fieldGame.style.width = size.width + 'px';
}

function afficherPioche(){
    var pioche = document.getElementById("pioche");
    var dim = ((size.height-300) - pioche.clientHeight)/2 ;
    var fieldPioche = document.getElementById("fieldPiocheScore");
    fieldPioche.style.paddingTop = dim + 'px';
    fieldPioche.style.paddingBottom =dim + 'px';
}


function AffichagePiocherCarte(){
    if(idJoueurActif==0){
    updateCarteMainJoueur();
    }else{
    updateCarteMainAdversaire();
    }
}
