// Adult form
$(document).on('pagecreate', '#report_adult', function() {
    var labels = [$("#label-select-description-0"), $("#label-select-description-1"), $("#label-select-description-2")];
    var answers = [$("#select-description-0"), $("#select-description-1"), $("#select-description-2")];
    var questions = [$("#description-0"), $("#description-1"), $("#description-2")];
    var locations = [$("#location-options")];
    var photos = [$("#attachment")];
    var notes = [$("#notes")];
    var terms = [$("#terms")];

    var sections = [$("#checkbox-description"), $("#checkbox-location"), $("#checkbox-photos"), $("#checkbox-notes")];
    var locationChoices = [$("#location-choice-1"), $("#location-choice-2")];

    var map = getMap("mapView", LATITUDE_DEFAULT, LONGITUDE_DEFAULT, false);

    configureForm(sections, locationChoices, questions, locations, photos, notes, $("#adult_form"), "adult", labels, answers, map, terms);
});

// Site form
$(document).on('pagecreate', '#report_site', function() {
    var sLabels = [$("#label-select-site-description-0"), $("#label-select-site-description-1"), $("#label-select-site-description-2")];
    var sAnswers = [$("#select-site-description-0"), $("#select-site-description-1"), $("#select-site-description-2")];
    var sQuestions = [$("#site-description-0"), $("#site-description-1"), $("#site-description-2")];
    var sLocations = [$("#site-location-options")];
    var sPhotos = [$("#site-attachment")];
    var sNotes = [$("#site-notes")];
    var sTerms = [$("#checkbox-site-terms")];

    var sSections = [$("#checkbox-site-description"), $("#checkbox-site-location"), $("#checkbox-site-photos"), $("#checkbox-site-notes")];
    var sLocationChoices = [$("#site-location-choice-1"), $("#site-location-choice-2")];

    var sMap = getMap("site-mapView", LATITUDE_DEFAULT, LONGITUDE_DEFAULT, false);

    configureForm(sSections, sLocationChoices, sQuestions, sLocations, sPhotos, sNotes, $("#site_form"), "site", sLabels, sAnswers, sMap, sTerms);
});


// Functions
function configureForm(sections, locationChoices, questions, locations, photos, notes, form, type, labels, answers, map, terms) {
    $(" div[id*='mapView'] ").hide();

    toggleStatus(sections[0], questions);
    sections[0].on('click', function() {
        toggleStatus($(this), questions);
    });
    toggleStatus(sections[1], locations);
    sections[1].on('click', function() {
        toggleStatus($(this), locations);
    });
    toggleStatus(sections[2], photos);
    sections[2].on('click', function() {
        toggleStatus($(this), photos);
    });
    toggleStatus(sections[3], notes);
    sections[3].on('click', function() {
        toggleStatus($(this), notes);
    });

    locationChoices[0].on('click', function() {
        navigator.geolocation.getCurrentPosition(function(position) {
            var latitude = position.coords.latitude;
            var longitude = position.coords.longitude;
            $(" div[id*='mapView'] ").show();
            map.invalidateSize();
            map.setView([latitude, longitude], ZOOM_DEFAULT);
        }, geolocationError);    // Use geolocation, must WARN USER
    });

    locationChoices[1].on('click', function() {
        $(" div[id*='mapView'] ").show();
        map.invalidateSize();
        map.setView([LATITUDE_DEFAULT, LONGITUDE_DEFAULT], ZOOM_DEFAULT);
    });

    form.submit(function (event) {
        var is_safari = checkIfSafari();
        if(!attributeSupported("required") || is_safari) {
            $(" form [required]").each(function(index) {
                if(!$(this).val()) {
                    alert("Please fill all fields marked with *");
                    return false;
                }
            });
        }
        else {
            var jsonObj = createJSONObject(type, labels, answers, $(" input[name*='notes-text'] ").val());
            var file, withImage;
            $(" input[name*='attachment'] ").each(function() {
                 file = $(this).prop("files")[0];
            });
            if($.isEmptyObject(file)) { // check if there's something attached
                withImage=false;
            }
            else {
                var fData = new FormData();
                fData.append('report', jsonObj.version_UUID);
                fData.append('photo', file, file.name);
                withImage=true;
            }

            if(localStorage.getItem('user_uuid')==null) {   // check if there's a local user
                sendUser(jsonObj, withImage, fData);
            }
            else {
                sendReport(jsonObj, withImage, fData);
            }

            console.log(JSON.stringify(jsonObj, null, '\t'));
        }

        event.preventDefault(); // avoid redirection
        $.mobile.changePage("#");
    });
}

function attributeSupported(attribute) { // From http://wideline-studio.com/blog/html5-form-features-and-their-javascript-fallbacks
  return (attribute in document.createElement("input"));
}

function checkIfSafari() {
    return (navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1);
}

function sendUser(jsonObject, image, fData) {
    console.log("Creating UUID");
    var user_uuid = uuid.v4();
    var mData = new FormData();
    mData.append( "user_UUID", user_uuid );

    jsonObject.user = user_uuid;
    console.log(user_uuid);
    $.ajax({
        type: "POST",
        url: TIGASERVER_APIURL + TIGASERVER_APIURL_USERS,
        data: mData,
        processData: false,
        contentType: false,
        beforeSend: function(request) {
        request.setRequestHeader("Authorization", TIGASERVER_AUTHORIZATION);
        },
        success: function(data) {
            alert(data.user_UUID);
            localStorage["user_uuid"] = user_uuid;
            console.log("A user UUID exists");
            console.log(localStorage.getItem("user_uuid"));
            sendReport(jsonObject, image, fData);
        },
        error: function(error) {
            console.log("ERROR:" + error.responseText);
        }

    });
}
function sendReport(jsonObject, image, fData) {
    $.ajax({
        type: "POST",
        url: TIGASERVER_APIURL + TIGASERVER_APIURL_REPORTS,
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
        url: TIGASERVER_APIURL + TIGASERVER_APIURL_PHOTOS,
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
    console.log("Initializing map, geolocation: " + geolocation);
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
        localStorage["selected_location_lat"] = LATITUDE_DEFAULT;
        localStorage["selected_location_lon"] = LONGITUDE_DEFAULT;

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
                    "answer": answer[0].find('option:selected').text()
                },
                {
                    "question": label[1].text(),
                    "answer": answer[1].find('option:selected').text()
                },
                {
                    "question": label[2].text(),
                    "answer": answer[2].find('option:selected').text()
                }
            ],

    };
    return jsonObj;
}

function geolocationError(err) {
    console.log(err);
    if(err.code==1) { // user denied permission
        alert(err.message);
    }
}