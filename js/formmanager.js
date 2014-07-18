// Adult form
$(document).on('pagebeforeshow', '#report_adult', function() {

    var labels = [$("#label-select-description-0"), $("#label-select-description-1"), $("#label-select-description-2")];
    var answers = [$("#select-description-0"), $("#select-description-1"), $("#select-description-2")];
    var questions = [$("#description-0"), $("#description-1"), $("#description-2")];
    var locations = [$("#location-options")];
    var photos = [$("#attachment")];
    var notes = [$("#notes")];

    // configure mapView
    var map = getMap("mapView", 41.683200, 2.801387, false);   // Center on CEAB

    // on page load, hide questions);
    toggleStatus($("#checkbox-description"), questions);
    toggleStatus($("#checkbox-location"), locations);
    toggleStatus($("#checkbox-photos"), photos);
    toggleStatus($("#checkbox-notes"), notes);

    // configure location selector
    $("#location-choice-1").on('click', function() {
        map.remove();
        navigator.geolocation.getCurrentPosition(function(position) {
            var latitude = position.coords.latitude;
            var longitude = position.coords.longitude;
            //map.panTo(L.latLng(latitude, longitude));
            map = getMap("mapView", latitude, longitude, true);
        });     // Use geolocation, must WARN USER
    });

    $("#location-choice-2").on('click', function() {
        map.remove();
        map = getMap("mapView", 41.683200, 2.801387, false);   // Center on CEAB
    });

    // configure checkboxes
    $('#checkbox-description').on('click', function() {
        toggleStatus($(this), questions);
    });

    $("#checkbox-location").on('click', function() {
        toggleStatus($(this), locations);
        map.invalidateSize();       // resize map, otherwise it won't render centered
    });

    $('#checkbox-photos').on('click', function(){
        toggleStatus($(this), photos);
    });

    $('#checkbox-notes').on('click', function() {
        toggleStatus($(this), notes);
    });

    // Submit configuration
    $('#adult_form').submit(function (event) {

        var is_safari = checkIfSafari();

        if (!attributeSupported("required") || is_safari) { // IE and Safari does not support 'required' properly
            $("#site_form [required]").each(function(index) {
                if (!$(this).val()) {
                    alert("Please fill all fields marked with *");
                    return false;
                }
            });
        }
        else {
            var jsonObj = createJSONObject("adult", labels, answers, $('#checkbox-notes-text').val());
            console.log(JSON.stringify(jsonObj, null, '\t'));   // Pretty print from http://myshittycode.com/2013/09/17/pretty-print-json-in-javascript/
            sendReport(jsonObj, false, null);

            if($("#attachment").prop("files")[0] && $("#checkbox-photos").is(":checked")) {
                console.log("file found");
                // Post photos
                var fData = new FormData();
                var file =  $("#attachment").prop("files")[0];
                fData.append('report', jsonObj.version_UUID);
                fData.append('file', file, file.name);
                sendReport(jsonObj, true, fData);   // Send with image
            }
            else {
                console.log("no file found");
                sendReport(jsonObj, false, null);   // Send without image
            }
        }
        event.preventDefault(); // avoid redirection
    });
});


// Site form
$(document).on('pagebeforeshow', '#report_site', function() {

    var sLabels = [$("#label-select-site-description-0"), $("#label-select-site-description-1"), $("#label-select-site-description-2")];
    var sAnswers = [$("#select-site-description-0"), $("#select-site-description-1"), $("#select-site-description-2")];
    var sQuestions = [$("#site-description-0"), $("#site-description-1"), $("#site-description-2")];
    var sLocations = [$("#site-location-options")];
    var sPhotos = [$("#site-attachment")];
    var sNotes = [$("#site-notes")];

    // configure mapView
    var map = getMap("site-mapView", 41.683200, 2.801387, false); // Center on CEAB

    // on page load, hide questions);
    toggleStatus($("#checkbox-site-description"), sQuestions);
    toggleStatus($("#checkbox-site-location"), sLocations);
    toggleStatus($("#checkbox-site-photos"), sPhotos);
    toggleStatus($("#checkbox-site-notes"), sNotes);

    // configure location selector
    $('#site-location-choice-1').on('click', function() {
        map.remove();
        navigator.geolocation.getCurrentPosition(function(position) {
            var latitude = position.coords.latitude;
            var longitude = position.coords.longitude;
            //map.panTo(L.latLng(latitude, longitude));
            map = getMap("site-mapView", latitude, longitude, true);
        });     // Use geolocation, must WARN USER
    });

    $("#site-location-choice-2").on('click', function() {
        map.remove();
        map = getMap("site-mapView", 41.683200, 2.801387, false);   // Center on CEAB
    });

    // configure checkboxes
    $("#checkbox-site-description").on('click', function() {
        toggleStatus($(this), sQuestions);
    });

    $("#checkbox-site-location").on('click', function() {
        toggleStatus($(this), sLocations);
        map.invalidateSize();       // resize map, otherwise it won't render centered
    });

    $("#checkbox-site-photos").on('click', function() {
        toggleStatus($(this), sPhotos);
    });

    $('#checkbox-site-notes').on('click', function() {
        toggleStatus($(this), sNotes);
    });

    // Submit configuration
    $('#site_form').submit(function (event) {

        var is_safari = checkIfSafari();
        if (!attributeSupported("required") || is_safari) { // IE and Safari does not support 'required' properly
            $("#site_form [required]").each(function(index) {
                if (!$(this).val()) {
                    alert("Please fill all fields marked with *");
                    return false;
                }
            });
        }
        else {
            var jsonObj = createJSONObject("site", sLabels, sAnswers, $('#checkbox-site-notes-text').val());
            console.log(JSON.stringify(jsonObj, null, '\t'));   // Pretty print from http://myshittycode.com/2013/09/17/pretty-print-json-in-javascript/
            //sendReport(jsonObj);

            // Post with photos
            var file = $("#site-attachment").prop("files")[0];
            var fData = new FormData();
            fData.append('report', jsonObj.version_UUID)
            fData.append('photo', file, file.name);

            sendReport(jsonObj, true, fData);
        }

        event.preventDefault(); // avoid redirection
    });
});


// Functions
function attributeSupported(attribute) { // From http://wideline-studio.com/blog/html5-form-features-and-their-javascript-fallbacks
  return (attribute in document.createElement("input"));
}

function checkIfSafari() {
    return (navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1);
}

function sendReport(jsonObject, image, fData) {
    $.ajax({
        type: "POST",
        url: TIGASERVER_APIURL + TIGASERVER_APIURL_REPORTS;
        data: JSON.stringify(jsonObject),
        processData: false,
        contentType: "application/json",
        beforeSend: function(request) {
            request.setRequestHeader("Authorization",  TIGASERVER_AUTHORIZATION);
        },
        success: function(data) {
            //alert("Success");
            //localStorage["user_uuid"] = uuid;
            if(image) {
                sendImage(fData);
            }
        },
            error: function(error) {
            console.log("ERROR:" + error.responseText);
        }

    });
}

function sendImage(data) {
    console.log("Attempting to send image");

    $.ajax({
        type: "POST",
        url: TIGASERVER_APIURL + TIGASERVER_APIURL_PHOTOS;
        data: data,
        processData: false,
        contentType: false, // This will be configured as multipart/form-data
        beforeSend: function(request) {
            request.setRequestHeader("Authorization",  TIGASERVER_AUTHORIZATION);
        },
        success: function(data) {
            alert("Success");
        },
        error: function(error) {
            console.log("ERROR:" + error.responseText);
        }
    });
}

function getMap(name, lat, lng, geolocation) {
    //console.log("Initializing map, geolocation: " + geolocation);
    var m = L.map(name).setView([lat, lng], 13);
    var markers = new L.FeatureGroup();
    L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: "\u00a9 <a href=\"http://www.openstreetmap.org/copyright\">OpenStreetMap</a> contributors",
        maxZoom: 18,
        center: [lat, lng]
    }).addTo(m);
    markers.addLayer(L.marker([lat, lng]));
    m.addLayer(markers);

    if(!geolocation) {

        // Set defaults
        localStorage["location_choice"] = "selected";
        localStorage["current_location_lat"] = 0.0;
        localStorage["current_location_lon"] = 0.0;
        localStorage["selected_location_lat"] = 41.683200;
        localStorage["selected_location_lon"] = 2.801387;

        // Set click listener
        m.on('click', function(e) {
            localStorage["location_choice"] = "selected";
            localStorage["current_location_lat"] = 0.0;
            localStorage["current_location_lon"] = 0.0;
            localStorage["selected_location_lat"] = e.latlng.lat;
            localStorage["selected_location_lon"] = e.latlng.lng;
            m.removeLayer(markers);     // Remove old markers, there MUST be only one
            markers = new L.FeatureGroup();
            markers.addLayer(L.marker([e.latlng.lat, e.latlng.lng]));
            m.addLayer(markers);
            $('#mapCoordinates').text(e.latlng); //Write coordinates in the form
        });
    }
    else {
        localStorage["location_choice"] = "current";
        localStorage["current_location_lat"] = lat;
        localStorage["current_location_lon"] = lng;
        localStorage["selected_location_lat"] = 0.0;
        localStorage["selected_location_lon"] = 0.0;
        $('#mapCoordinates').text(L.latLng([lat,lng]));
    }
    return m;
}

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
            "location_choice": localStorage.getItem("location_choice"),
            "current_location_lon": localStorage.getItem("current_location_lon"),
            "current_location_lat": localStorage.getItem("current_location_lat"),
            "selected_location_lon": localStorage.getItem("selected_location_lon"),
            "selected_location_lat": localStorage.getItem("selected_location_lat"),
            "note": note,
            "package_name": "ceab.movelab.tigahtml5",
            "package_version": 0,
            "device_manufacturer": "",
            "device_model": "",
            "os": window.navigator.platform,
            "os_version": window.navigator.oscpu,
            "os_language":  window.navigator.language,
            "app_language": navigator.language || navigator.userLanguage,
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
