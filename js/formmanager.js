// Adult form
$(document).on('pagebeforeshow', '#report_adult', function() {

    var labels = [$("#label-select-description-0"), $("#label-select-description-1"), $("#label-select-description-2")];
    var answers = [$("#select-description-0"), $("#select-description-1"), $("#select-description-2")];
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

    // Submit configuration
    $('#adult_form').submit(function (event) {
        var jsonObj = createJSONObject("adult", labels, questions, $('#checkbox-notes-text').val());

        //TODO: Send to server
        console.log(JSON.stringify(jsonObj, null, '\t'));   // Pretty print from http://myshittycode.com/2013/09/17/pretty-print-json-in-javascript/

    });
});


// Site form
$(document).on('pagebeforeshow', '#report_site', function() {

    var sLabels = [$("#label-select-site-description-0"), $("#label-select-site-description-1"), $("#label-select-site-description-2")];
    var sAnswers = [$("#select-site-description-0"), $("#select-site-description-1"), $("#select-site-description-2")];
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

    // Submit configuration
    $('#site_form').submit(function (event) {
        var jsonObj = createJSONObject("site", sLabels, sAnswers, $('#checkbox-site-notes-text').val());

        //TODO: Send to server
        console.log(JSON.stringify(jsonObj, null, '\t'));   // Pretty print from http://myshittycode.com/2013/09/17/pretty-print-json-in-javascript/

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

function createJSONObject(type, label, answer, note) {
    // Digits for report_id based on John's Android implementation
    var digits = [ "1", "2", "3", "4", "5", "6", "7", "8", "9", "A",
            "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M",
            "N", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z",
            "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l",
            "m", "n", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z" ];

    var date = new Date().toISOString();

    // TODO: Location info
    var jsonObj = {
            "version_UUID": uuid.v4(),
            "version_number": 0,
            "user": localStorage.getItem("user_uuid"),
            "report_id": digits[Math.floor(Math.random()*59)]+digits[Math.floor(Math.random()*59)]
                    +digits[Math.floor(Math.random()*59)]+digits[Math.floor(Math.random()*59)],
            "phone_upload_time": date,
            "creation_time": date,
            "version_time": date,
            "type": type,
            "mission": null,
            "location_choice": null,
            "current_location_lon": null,
            "current_location_lat": null,
            "selected_location_lon": null,
            "selected_location_lat": null,
            "note": note,
            "package_name": "ceab.movelab.tigahtml5",
            "package_version": 0,
            "device_manufacturer": "HTC",
            "device_model": "T-Mobile G1",
            "os": window.navigator.platform,
            "os_version": window.navigator.oscpu,
            "os_language":  window.navigator.language,
            "app_language": "ca",
            "responses": [
                {
                    "question": label[0].text(),
                    "answer": answer[0].val()
                },
                {
                    "question": label[1].text(),
                    "answer": answer[1].val()
                },
                {
                    "question": label[2].text(),
                    "answer": answer[2].val()
                }
            ],

    };
    return jsonObj;
}
