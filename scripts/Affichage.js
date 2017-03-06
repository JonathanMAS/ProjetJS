var size = {
width: document.body.clientWidth ,
height: document.body.clientHeight
};



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
