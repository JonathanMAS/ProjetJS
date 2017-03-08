var size = {
width: document.body.clientWidth ,
height: document.body.clientHeight
};


function afficherPaquetsJoueurs(){
    afficherCartesAdversaire();
    afficherCartesJoueur();
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
        img.style.padding = "10px";
        main.appendChild(img);
        assignCarte(joueurs[0].cartesEnMain[i]);
    }
}

function selectCarte(id){
    alert("selection de "+id);
}

function carteMouseOver(evt){
	document.getElementById(evt.target.id).width = 160;
}
function carteMouseOut(evt){
	document.getElementById(evt.target.id).width = 150;
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
        img.width= width_cartes;
        img.style.padding = "10px";
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
