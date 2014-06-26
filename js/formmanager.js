// Adult form
$(document).on('pagebeforeshow', '#report_adult', function() {

    var questions = [$("#description-0"), $("#description-1"), $("#description-2")];
    var photos = [$("#attachment")];
    var notes = [$("#notes")];
    // on page load, hide questions);
    toggleStatus($("#checkbox-description"), questions);
    toggleStatus($("#checkbox-photos"), photos);
    toggleStatus($("#checkbox-notes"), notes);

    // configure checkboxes
    $('#checkbox-description').on('click', function() {
        toggleStatus($(this), questions);
    });

    $('#checkbox-photos').on('click', function(){
        toggleStatus($(this), photos);
    });

    $('#checkbox-notes').on('click', function() {
        toggleStatus($(this), notes);
    });
});


function toggleStatus(checkbox, elements) {
    if(checkbox.is(':checked')) {
        for(var i=0; i<elements.length; i++) {
            elements[i].show();
        }
        //$("#description-0").show();
        //$("#description-1").show();
        //$("#description-2").show();
    }
    else {
        for(var i=0; i<elements.length; i++) {
            elements[i].hide();
        }
    }
}


// Site form
$(document).on('pagebeforeshow', '#report_site', function() {

    var sQuestions = [$("#site-description-0"), $("#site-description-1"), $("#site-description-2")];
    var sPhotos = [$("#site-attachment")];
    var sNotes = [$("#site-notes")];
    // on page load, hide questions);
    toggleStatus($("#checkbox-site-description"), sQuestions);
    toggleStatus($("#checkbox-site-photos"), sPhotos);
    toggleStatus($("#checkbox-site-notes"), sNotes);

    // configure checkboxes
    $("#checkbox-site-description").on('click', function() {
        toggleStatus($(this), sQuestions);
    });

    $("#checkbox-site-photos").on('click', function() {
        toggleStatus($(this), sPhotos);
    });

    $('#checkbox-site-notes').on('click', function() {
        toggleStatus($(this), sNotes);
    });
});
