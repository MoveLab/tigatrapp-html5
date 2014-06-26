// Adult form
$(document).on('pagebeforeshow', '#report_adult', function() {
    // on page load, hide questions);
    toggleAQuestions($("#checkbox-description"));
    toggleAPhoto($("#checkbox-photos"));
    toggleANotes($("#checkbox-notes"));

    // configure checkboxes
    $('#checkbox-description').on('click', function() {
        toggleAQuestions($(this));
    });

    $('#checkbox-photos').on('click', function(){
        toggleAPhoto($(this));
    });

    $('#checkbox-notes').on('click', function() {
        toggleANotes($(this));
    });
});


function toggleAQuestions(checkbox) {
    if(checkbox.is(':checked')) {
        $("#description-0").show();
        $("#description-1").show();
        $("#description-2").show();
    }
    else {
        $("#description-0").hide();
        $("#description-1").hide();
        $("#description-2").hide();
    }
}


function toggleAPhoto(photos) {
    if(photos.is(':checked')) {
        $("#attachment").show();
    }
    else {
        $("#attachment").hide();
    };
}

function toggleANotes(notes) {
    if(notes.is(':checked')) {
        $("#notes").show();
    }
    else {
        $("#notes").hide();
    }
};

// Site form
$(document).on('pagebeforeshow', '#report_site', function() {
    // on page load, hide questions);
    toggleSQuestions($("#checkbox-site-description"));
    toggleSPhoto($("#checkbox-site-photos"));
    toggleSNotes($("#checkbox-site-notes"));

    // configure checkboxes
    $("#checkbox-site-description").on('click', function() {
        toggleSQuestions($(this));
    });


    $("#checkbox-site-photos").on('click', function() {
        toggleSPhoto($(this));
    });

    $('#checkbox-site-notes').on('click', function() {
        toggleSNotes($(this));
    });
});

function toggleSQuestions(checkbox) {
    if(checkbox.is(':checked')) {
        $("#site-description-0").show();
        $("#site-description-1").show();
        $("#site-description-2").show();
    }
    else {
        $("#site-description-0").hide();
        $("#site-description-1").hide();
        $("#site-description-2").hide();
    }
}

function toggleSPhoto(photos) {
    if(photos.is(':checked')) {
        $("#site-attachment").show();
    }
    else {
        $("#site-attachment").hide();
    }
};


function toggleSNotes(notes) {
    if(notes.is(':checked')) {
        $("#site-notes").show();
    }
    else {
        $("#site-notes").hide();
    }
};