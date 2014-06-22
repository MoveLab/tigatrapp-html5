// An attempt to use Android string resources
// based on http://www.webgeekly.com/tutorials/jquery/how-to-make-your-site-multilingual-using-xml-and-jquery/

// Just add "localizable" as class identifier to whatever object that must be localized,
// and then assign the string name to the custom data-lclstring attribute.

$(function() {
    var langCode = '-ca'; // dummy variable, will use URL
    $.ajax({
        type: "GET",
        url: "strings/values" + langCode + "/strings.xml",
        dataType: "xml",
        success: function(xml) {
            $(xml).find('string').each(function() {
                var name = $(this).attr('name');
                var text = $(this).text().replace("\\","");

                // Using plain classes
                //$("."+name).html(text);

                // Using custom data- attributes
                $(".localizable").map(function() {
                    if($(this).data("lclstring")==name) {
                        $(this).html(text);
                    }
                });
            });
        }
    });
});