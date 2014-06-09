// A very rough swipeable gallery 

$(function() {
	
	var imageContainer = $("#galleryImg"); // Link to 'imageContainer' div
	var imagePath = 'images/gallery/';
	var srcArray = [imagePath + 'a.jpg', imagePath + 'c.jpg',
					imagePath + 'd.jpg', imagePath + 'e.jpg',
					imagePath + 'f.jpg', imagePath + 'g.jpg',
					imagePath + 'h.jpg', imagePath + 'i.jpg',
					imagePath + 'j.jpg', imagePath + 'k.jpg',
					imagePath + 'l.jpg'];
	//var titleArray = ['A title']; // Show some image info?
	var imagePos = 0;
	
	// Add first image by default
	//var elem = $("<div class='image'><img src='"+srcArray[0]+"' width='100%'/><div>"+
    //                titleArray[0]+"</div>");
    var elem = $("<div class='image'><img src='"+srcArray[0]+"' width='100%'/>" +
    "<div class='gallery_array_0'></div>");
	imageContainer.append(elem);
	parseGalleryArray(0);

	// Handle touch events
	imageContainer.on("swipeleft", function() {
		nextImage();
	});
	
	imageContainer.on("swiperight", function() {
		prevImage();
	});
	
	// Handle buttons
	$("#previmg").click(function(e) {
		prevImage()
	});
	$("#nextimg").click(function(e) {
		nextImage()
	});
	
	function nextImage() {
		applySwipeEffect();
		imagePos=imagePos+1;
		if(imagePos==srcArray.length) {
			imagePos=0;
		}
	}
	
	function prevImage() {	
		applySwipeEffect();
		imagePos=imagePos-1;
		
		if(imagePos<0) {
			imagePos=srcArray.length-1;
		}
	}
	
	function applySwipeEffect() {
	    // Use a fading effect, on fadeOut finish replace image and fadeIn
		imageContainer.fadeOut(function() {
		        imageContainer.empty(); // delete old elements
        		var elem = $("<div class='image'><img src='"+srcArray[imagePos]+
        		"' width='100%'/><div class='gallery_array_"+ imagePos + "' />");
        		imageContainer.append(elem);
        		parseGalleryArray(imagePos);
        		imageContainer.fadeIn();
		});

	}



    // Load text from Android files
    // TODO: Move to localization.js?
    function parseGalleryArray(position) {
        var langCode = '-ca';  // dummy variable, will use URL
        $.ajax({
            type: "GET",
            url: "strings/values" + langCode + "/strings.xml",
            dataType: "xml",
            success: function(xml) {
                $(xml).find('string-array').each(function() {
                    if($(this).attr('name')=='gallery_array') {
                        var text = $(this).find('item').map(function() {
                            return $(this).text().replace("\\","");
                        }).get(position);
                        $(".gallery_array_"+position).html(text);
                    }
                });
            }
        });
    }
});

