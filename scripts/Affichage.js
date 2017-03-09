var size = {
width: document.body.clientWidth ,
height: document.body.clientHeight
};


function afficherPaquetsJoueurs(){
    afficherCartesAdversaire();
    afficherCartesJoueur();
}

function removeCarteMainJoueur(id){
    var main = document.getElementById("main");
    for(var i=0;i<main.childNodes.length;i++){
        if(id == main.childNodes[i].id){
            main.removeChild(main.childNodes[i]);
        }
    }
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
    bataille.appendChild(galion);
    bataille.onClick = PoserCarte;
}

function afficherCartesJoueur(){
    var main = document.getElementById("main");
    main.style.marginBottom = "-150px";
    var nb_cartes= joueurs[0].cartesEnMain.length; // Joueur 0
    var width_cartes = size.width/nb_cartes;
    if(width_cartes>170){
        width_cartes=150;
    }
    
    for(var i=0;i<nb_cartes;i++){
        var img = document.createElement("img");
        img.src = joueurs[0].cartesEnMain[i].cheminImage;
        img.id = joueurs[0].cartesEnMain[i].idCarte;
      //  alert(joueurs[0].cartesEnMain[i].idCarte);
        img.width= width_cartes;
		img.style.opacity = "0.7";
        img.style.padding = "10px";
        main.appendChild(img);
        assignCarte(joueurs[0].cartesEnMain[i]);
    }
}

function addCarteBataille(){
    
}

function selectCarte(id){
    //alert("selection de "+id);
	//console.log("rergrdsfzgrsf");
	var v = document.getElementById(id);
	v.style.opacity = "1";
}
function unselectCarte(id){
    var v = document.getElementById(id);
	v.style.opacity = "0.5";
}

function carteMouseOver(evt){
	var v = document.getElementById(evt.target.id);
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
	v.style.border = "solid 1px";
	v.style.borderRadius = "8px";
	console.log(findCarte(evt.target.id));
}
function piocheMouseOut(evt){
	var v = document.getElementById(evt.target.id);
	v.style.opacity = "0.85";
	v.style.borderRadius = "8px";
}

function afficherCartesAdversaire(){
    var advers = document.getElementById("main_adverse");
    advers.style.marginTop = "-150px";
    document.getElementById("center").style.marginTop = "100px";
    var nb_cartes= joueurs[1].cartesEnMain.length; // IA 1
    var width_cartes = size.width/nb_cartes;
    if(width_cartes>170){
        width_cartes=150;
    }

    for(var i=0;i<nb_cartes;i++){
        var img = document.createElement("img");
        img.src = "res/cartes/carte.png";
		img.id = joueurs[1].cartesEnMain[i].idCarte;
        img.width= width_cartes;
        img.style.padding = "10px";
		img.style.transition = "width 0.5s";
		img.onmouseover = carteMouseOver;
		img.onmouseout = carteMouseOut;
        advers.appendChild(img);
    }
}

function defineFieldGame(){
    var fieldGame = document.getElementById("fieldGame");
    fieldGame.style.width = size.width + 'px';
}

function afficherPioche(){
    var pioche = document.getElementById("pioche");
    var dim = ((size.height-200) - pioche.clientHeight)/2 ;
    pioche.style.paddingTop = dim + 'px';
    pioche.style.paddingBottom =dim + 'px';
}

function PoserCarte(){
    //afficher pioche (+ animation...)
}
function PiocherCarte(){
    //afficher pioche (+ animation...)
}
