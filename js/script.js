console.log("début jquery");
$(document).ready(function() {
    console.log("ready!");
    $('li').click(function() {
        if ($(this).hasClass('nselect')) {
            $(this).removeClass();
            $(this).hadClass('select');
        } else {
            $(this).removeClass();
            $(this).hadClass('nselect');
        }

        console.log("fonction changement class fini");
    });
});