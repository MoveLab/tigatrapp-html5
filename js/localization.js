// An attempt to use Android string resources
// based on http://www.webgeekly.com/tutorials/jquery/how-to-make-your-site-multilingual-using-xml-and-jquery/

// Just add "localizable" as class identifier to whatever object that must be localized,
// and then assign the string name to the custom data-lclstring attribute.

$(function() {
    var AVAILABLE_CODES = new Array("ca", "en", "es");
    var DEFAULT_CODE = "en";
    var lang = navigator.language || navigator.userLanguage;
    lang = lang.substr(0,2);
    if($.inArray(lang, AVAILABLE_CODES)==-1 || lang==null) {
        lang=DEFAULT_CODE;
    }
    console.log("Language is: " + lang);
    var langCode = '-' + lang;
    $.ajax({
        type: "GET",
        url: "strings/values" + langCode + "/strings.xml",
        dataType: "xml",
        success: function(xml) {
            $(xml).find('string').each(function() { // Parse strings
                var name = $(this).attr('name');
                var text = $(this).text().replace(/\\/g,"");

                // Using plain classes
                //$("."+name).html(text);

                // Using custom data- attributes
                $(".localizable").map(function() {
                    if($(this).data("lclstring")==name) {
                        $(this).html(text);
                    }
                });
            });
            $(xml).find('string-array').each(function() { //Parse string arrays
                if($(this).attr('name')=='gallery_array') { // Gallery
                    var text = $(this).find('item').map(function() {
                        return $(this).text().replace(/\\/g,"");
                    });
                    //$(".gallery_array_"+position).html(text);
                    $(".localizable").map(function() {
                        if($(this).data("lclstringarray")=="gallery") {
                            $(this).html(text.get($(this).data("lclstringarraypos")));
                        }

                    });
                }
            });

        }
    });
});
