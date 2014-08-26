$(document).ready(function() {
	//initiate ajax call on page load
	var hashtag = "parisadventure";
	searchPics(hashtag);

	//hover over icons
	$("button .fa-heart").hover(function() {
		$(this).toggleClass("bigger");
	});
	$("button .fa-question").hover(function() {
		$(this).toggleClass("bigger");
	});
	$(".fa-times").hover(function() {
		$(this).toggleClass("arrow-background");
	});

	//click on heart or question icon to get information
	$(".createButton").on("click",function () {
		//clear out gallery
		$(".gallery").html("");
		//hide slideshow
		$(".slideshow-container").hide();
		$(".directions").hide();
		$(".createAlbum").show();
	});
	$(".instructButton").on("click",function () {
		//clear out gallery
		$(".gallery").html("");
		//hide slideshow
		$(".slideshow-container").hide();
		$(".createAlbum").hide();
		$(".directions").show();
	});

	$("#search").click (function() {
		$(this).val("");
	});

	// sumbit new hashtag to get new photos
	$("form").submit(function (evt) {
		evt.preventDefault();

		//hide directions if they were up
		$(".createAlbum").hide();
		$(".directions").hide();
		
		var hashtag = $("#search").val();

		// initate ajax call
		searchPics(hashtag);

	}); //end submit

}); //end ready	



	var searchPics = function(hashtag) {
		

		var getPhotos = $.ajax ({
			url:"https://api.instagram.com/v1/tags/" + hashtag + "/media/recent?client_id=920d83e2718741b885af9d6323a498b4",
			dataType:"jsonp",
			type:"GET"
		})
		.done(function(getPhotos) {

			var imageCounter=0;

			var results = '<div class="gallery-wrapper">';

			$.each(getPhotos.data, function(index, photo) {
				
				results += '<a class="grouped_elements" rel="group1" href="' + photo.images.standard_resolution.url + '"><img src="' + photo.images.standard_resolution.url + '"/>';
				
				//if statement for if there is no caption for the pics
				if (photo.caption === null) {
					results += '<div class="caption"></div>';
				} else {
					results += '<div class="caption">' + photo.caption.text + '</div>';
				}

				results += '</a>';

			}); // each
				results += '</div>';//end of .gallery-wrapper
		
				$(".gallery").html(results);
	
				// fancy box slideshow
				$("a.grouped_elements").fancybox();

		}); //end .done()

	}; //end searchPics


