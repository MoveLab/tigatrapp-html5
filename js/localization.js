// An attempt to use Android string resources
// based on http://www.webgeekly.com/tutorials/jquery/how-to-make-your-site-multilingual-using-xml-and-jquery/

// Just add the string name as class identifier to whatever object that must be localized.

$(function() {
    var langCode = '-ca'; // dummy variable, will use URL
    $.ajax({
        type: "GET",
        url: "strings/values" + langCode + "/strings.xml",
        dataType: "xml",
        success: function(xml) {
            $(xml).find('string').each(function() {
                var name = $(this).attr('name');
                var text = $(this).text();
                $("."+name).html(text);
            });
        }
    });

});