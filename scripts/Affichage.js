var size = {
width: document.body.clientWidth ,
height: document.body.clientHeight
};

document.body.onload = defineFieldGame;
document.body.onresize = afficherPioche;

function afficherPaquetJoueur(nbJoueur){
    //nbJoueur>=2
    switch(nbJoueur){
    case 2:
        break;
    case 3:
        break;
    case 4:
        break;
        
    }
    //switch 2 haut IA bas joueur
    //switch 3 haut IA bas joueur gauche joueur
    //switch 4 haut IA droite / gauche / bas Joueur
}

function defineFieldGame(){
    var fieldGame = document.getElementById("fieldGame");
    fieldGame.style.width = size.width + 'px';
    afficherPioche();
}

function afficherPioche(){
    var pioche = document.getElementById("pioche");
    pioche.style.paddingTop = ((size.height-200) - pioche.clientHeight)/2 + 'px';
    pioche.style.paddingBottom =((size.height-200) - pioche.clientHeight)/2 + 'px';
}

function PoserCarte(){
    //afficher pioche (+ animation...)
}
function PiocherCarte(){
    //afficher pioche (+ animation...)
}
