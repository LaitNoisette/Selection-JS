console.log("début jquery");
$(document).ready(function() {
    console.log("doc commence");
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

    function test_ctrlkey() {
        var ctrl = false;
        $(document).keydown(function(e) {
            //On verifie que la touche presse est la touche ctrl
            //console.log("Touche selectionne");
            if (e.which == 17) {
                ctrl = true;
                //console.log("touche ctrl :" + ctrl);
            }

        });
        if (ctrl == true) {
            return true;
        }
        return false;
    }
    //Fonction Selection/Deselection 1 éléments
    $('li').click(function() {
        console.log("Debut Fonction Click");
        var click = $(this);
        var kd = test_ctrlkey();


        if (kd == false) {
            console.log("Simple click");
            del_select();
            select_deselect(click);
        }

        if (kd == true) {
            console.log("Selection multiple")
            select_deselect(click);
        }


        console.log("Valeur kd : " + kd + " fonction changement class fini Valeur click" + click);
    });



});