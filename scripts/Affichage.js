var size = {
width: document.body.clientWidth ,
height: document.body.clientHeight
};


function afficherPaquetsJoueurs(){
    afficherCartesAdversaire();
}

function afficherCartesAdversaire(){
    var nb_cartes= joueurs[1].cartesEnMain.length;
    alert(nb_cartes);
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
