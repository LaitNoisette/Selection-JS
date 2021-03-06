console.log("début jquery");
$(document).ready(function() {
    console.log("doc commence");
    var ctrl = false;
    var xmouse; //position de la souris en x
    var ymouse; //postion de la souris en y 
    var mousedownbool = false; //controle si la souris est pressé
    var ySelectBoxInverse = false; // boolean pour savoir si la boite de selection est negative
    var xSelectBoxInverse = false; // boolean pour savoir si la boite de selection est negative
    var yPosInverseOrigin; //variable de stockage global de l'origine de la div 
    var xPosInverseOrigin; //variable de stockage global de l'origine de la div

    //Position de chaque elements selectionnable
    $("li").each(function() {
        console.log("gauche : " + $(this).position().left + " Haut : " + $(this).position().top);
    });

    //Fonction Selection/Deselection 1 éléments
    $('li').click(function() {
        console.log("Debut Fonction Click");
        var click = $(this);

        console.log(ctrl);

        if (ctrl == false) {
            console.log("Simple click");
            del_select();
            select_deselect(click);
        }

        if (ctrl == true) {
            console.log("Selection multiple")
            select_deselect(click);
        }

        console.log("Valeur ctrl : " + ctrl + " fonction changement class fini Valeur click" + click);
    });

    //Fonction permettant de changer la class de l'élément
    function select_deselect(e) {
        if (e.hasClass('nselect')) {
            e.removeClass("nselect").addClass("select");
        } else {
            e.removeClass("select").addClass("nselect");
        }
    }

    //Fonction permettant de supprimer tous les éléments sélectionné
    function del_select() {
        $(".select").each(function() {
            $(this).removeClass("select").addClass("nselect");
        });
    }

    //Controle de touche presse (ctrl)
    $(document).keydown(function(e) {
        //On verifie que la touche presse est la touche ctrl
        console.log("Touche selectionne");
        if (e.which == 17) {
            ctrl = true;
            console.log("touche ctrl :" + ctrl);
        } else {
            ctrl = false;
        }
        //ctrl = false;

    });

    $(document).keyup(function(e) {
        //On verifie que la touche relache est la touche ctrl
        console.log("Touche relache");
        if (e.which == 17) {
            ctrl = false;
            console.log("touche ctrl up :" + ctrl);
        }
        //ctrl = false;

    });

    //Initialisation de la boite de selection
    $(document).mousedown(function(e) {
        console.log("mousedown");
        e.preventDefault();
        initSelectBox(e.pageX, e.pageY);
        mousedownbool = true;
    });

    //function permettant d'initialiser la position de la div contenant la boite de selection
    function initSelectBox(x, y) {
        console.log("initialisation box");
        $("#selectbox").css('left', x);
        $("#selectbox").css('top', y);
        xPosInverseOrigin = x;
        yPosInverseOrigin = y;
        $("#selectbox").show();
    }

    //controle le deplacement de la souris 
    $(document).mousemove(function(e) {
        //console.log("x : " + e.pageX + " y : " + e.pageY);
        xmouse = e.pageX;
        ymouse = e.pageY;
        if (mousedownbool == true) {
            sizeSelectBox(xmouse, ymouse);
            collisionSelectBox();
        }
    });

    //fonction permettant de dimensionner la box de selection
    function sizeSelectBox(xPosMouse, yPosMouse) {
        console.log("xposbox : " + $("#selectbox").css('left') + " yposbox : " + $("#selectbox").css('top'));
        console.log("xposmouse : " + xPosMouse + " yposmouse : " + yPosMouse);
        var xPosBox = $("#selectbox").position().left;
        var yPosBox = $("#selectbox").position().top;

        //cas basique si la position de la souris est superieur
        if (yPosInverseOrigin <= yPosMouse) {
            ySelectBoxInverse = false;
            $("#selectbox").css('top', yPosInverseOrigin);
        }

        //cas basique 
        if (xPosInverseOrigin <= xPosMouse) {
            xSelectBoxInverse = false;
            $("#selectbox").css('left', xPosInverseOrigin);
        }

        //cas ou la difference entre la postion de la souris et lorigine est negatif (axe y,top), condition false evite protege un double appel
        if (yPosBox > yPosMouse && ySelectBoxInverse == false) {
            ySelectBoxInverse = true;
            yPosInverseOrigin = yPosBox;
            yPosBox = yPosMouse;
            yPosMouse = yPosInverseOrigin; //correspond a yPosBox
            $("#selectbox").css('top', yPosBox); //origine de la boite en y devient la position de la souris
        }

        //cas ou la difference entre la position de la souris et lorigine est negatif (axe x,left)
        if (xPosBox > xPosMouse && xSelectBoxInverse == false) {
            xSelectBoxInverse = true;
            xPosInverseOrigin = xPosBox;
            xPosBox = xPosMouse;
            xPosMouse = xPosInverseOrigin; //correspond a xPosBox
            $("#selectbox").css('left', xPosBox); //origine de la boite en x devient la position de la souris
        }

        // la taille de la boite est negativz
        if (xSelectBoxInverse == true) {
            xPosBox = xPosMouse; // on alterne les positions 
            xPosMouse = xPosInverseOrigin;
            $("#selectbox").css('left', xPosBox);
        }

        //taille negative
        if (ySelectBoxInverse == true) {
            yPosBox = yPosMouse;
            yPosMouse = yPosInverseOrigin;
            $("#selectbox").css('top', yPosBox);
        }

        //calcul des tailles
        var xsize = Math.abs(xPosMouse - xPosBox);
        var ysize = Math.abs(yPosMouse - yPosBox);
        console.log("taille box xsize : " + xsize + " ysize : " + ysize);
        //application des tailles
        $("#selectbox").css('height', ysize);
        $("#selectbox").css('width', xsize);
    }

    //Fonction permettant de controler les collisions de la select box avec les elements selectionnables
    function collisionSelectBox() {
        if (mousedownbool == true) {
            $("li").each(function() {
                //console.log("gauche : " + $(this).position().left + " Haut : " + $(this).position().top);
                //Coordonnees de la div selectionnable
                var xminE = $(this).position().left;
                var yminE = $(this).position().top;
                var xmaxE = $(this).position().left + $(this).width();
                var ymaxE = $(this).position().top + $(this).height();
                console.log("xminE : " + xminE + " xmaxE : " + xmaxE);
                //coordonnees de la boite de selection
                var xminSB = $("#selectbox").position().left;
                var yminSB = $("#selectbox").position().top;
                var xmaxSB = $("#selectbox").position().left + $("#selectbox").width();
                var ymaxSB = $("#selectbox").position().top + $("#selectbox").height();


                //gestion de la collision (retrouver sur un cours en ligne pour la formule gerant tous les cas)
                if ((xminSB > xmaxE) || (xmaxSB < xminE) || (yminSB > ymaxE) || (ymaxSB < yminE)) {
                    ncollision_nselect($(this));
                } else {
                    console.log("collision");
                    collision_select($(this));
                }
            });
        }

    }

    //fonction gerant la cas dune collision, element selectionne
    function collision_select(e) {
        if (e.hasClass('nselect')) {
            e.removeClass("nselect").addClass("select");
        }
    }

    //fonction gerant labscence de collision
    function ncollision_nselect(e) {
        if (e.hasClass('select')) {
            e.removeClass("select").addClass("nselect");
        }
    }

    //Detection souris relache,remise à 0 de la box de selection
    $(document).mouseup(function(e) {
        console.log("mouseup");
        mousedownbool = false;
        $("#selectbox").css('height', 0);
        $("#selectbox").css('width', 0);
        $("#selectbox").hide();
    });

});