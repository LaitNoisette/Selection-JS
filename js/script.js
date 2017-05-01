console.log("début jquery");
$(document).ready(function() {
    console.log("doc commence");
    var ctrl = false;
    var xmouse;
    var ymouse;
    var mousedownbool = false;
    var ySelectBoxInverse = false;
    var xSelectBoxInverse = false;
    var yPosInverseOrigin;
    var xPosInverseOrigin;

    //Position de chaque elements selectionnable
    $("li").each(function() {
        console.log("gauche : " + $(this).position().left + " Haut : " + $(this).position().top);
    });

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
        //On verifie que la touche presse est la touche ctrl
        console.log("Touche relache");
        if (e.which == 17) {
            ctrl = false;
            console.log("touche ctrl up :" + ctrl);
        }
        //ctrl = false;

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

    //controle le deplacement de la souris 
    $(document).mousemove(function(e) {
        //console.log("x : " + e.pageX + " y : " + e.pageY);
        xmouse = e.pageX;
        ymouse = e.pageY;
        if (mousedownbool == true) {
            sizeSelectBox(xmouse, ymouse);
        }
    });

    //Initialisation de la boite de selection
    $(document).mousedown(function(e) {
        console.log("mousedown");
        e.preventDefault();
        initSelectBox(e.pageX, e.pageY);
        mousedownbool = true;
    });

    //Detection souris relache,remise à 0 de la box de selection
    $(document).mouseup(function(e) {
        console.log("mouseup");
        mousedownbool = false;
        $("#selectbox").css('height', 0);
        $("#selectbox").css('width', 0);
        $("#selectbox").hide();
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

    //fonction permettant de dimensionner la box de selection
    function sizeSelectBox(xPosMouse, yPosMouse) {
        console.log("xposbox : " + $("#selectbox").css('left') + " yposbox : " + $("#selectbox").css('top'));
        console.log("xposmouse : " + xPosMouse + " yposmouse : " + yPosMouse);
        var xPosBox = $("#selectbox").position().left;
        var yPosBox = $("#selectbox").position().top;

        if (yPosInverseOrigin <= yPosMouse) {
            ySelectBoxInverse = false;
            $("#selectbox").css('top', yPosInverseOrigin);
        }

        if (xPosInverseOrigin <= xPosMouse) {
            xSelectBoxInverse = false;
            $("#selectbox").css('left', xPosInverseOrigin);
        }

        if (yPosBox > yPosMouse && ySelectBoxInverse == false) {
            ySelectBoxInverse = true;
            yPosInverseOrigin = yPosBox;
            yPosBox = yPosMouse;
            yPosMouse = yPosInverseOrigin;
            $("#selectbox").css('top', yPosBox);
        }

        if (xPosBox > xPosMouse && xSelectBoxInverse == false) {
            xSelectBoxInverse = true;
            xPosInverseOrigin = xPosBox;
            xPosBox = xPosMouse;
            xPosMouse = xPosInverseOrigin;
            $("#selectbox").css('left', xPosBox);
        }

        if (xSelectBoxInverse == true) {
            xPosBox = xPosMouse;
            xPosMouse = xPosInverseOrigin;
            $("#selectbox").css('left', xPosBox);
        }
        if (ySelectBoxInverse == true) {
            yPosBox = yPosMouse;
            yPosMouse = yPosInverseOrigin;
            $("#selectbox").css('top', yPosBox);
        }
        var xsize = Math.abs(xPosMouse - xPosBox);
        var ysize = Math.abs(yPosMouse - yPosBox);
        console.log("taille box xsize : " + xsize + " ysize : " + ysize);
        $("#selectbox").css('height', ysize);
        $("#selectbox").css('width', xsize);
    }

});