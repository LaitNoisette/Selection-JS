console.log("début jquery");
$(document).ready(function() {
    console.log("doc commence");
    var ctrl = false;
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



});