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
			//var slideResults = '<div id="slides">';

			$.each(getPhotos.data, function(index, photo) {
				
				results += '<div class="imageWrapper">';
				//slideResults += '<a href="javascript:setSlide(' + imageCounter + ')"<div class="slideImageWrapper">';
				results += '<img src="' + photo.images.standard_resolution.url + '"/>';
				//slideResults += '<img src="' + photo.images.standard_resolution.url + '"/>';
				
				//if statement for if there is no caption for the pics
				if (photo.caption === null) {
					results += '<div class="caption"></div>';
					//slideResults += '<div class="caption"></div>';
				} else {
					results += '<div class="caption">' + photo.caption.text + '</div>';
					//slideResults += '<div class="caption">' + photo.caption.text + '</div>';
				}

				results += '</div>';
				//slideResults += '</div></a>';
				imageCounter++;
			});
				results += '</div>';//end of .gallery-wrapper
				//slideResults += '</div>';//end of #slides

				$(".gallery").html(results);
				//$(".slides-wrapper").html(slideResults);
		

				//click on image to bring up slideshow
				/*$(".imageWrapper").click(function() {
					//show slideshow box
					$(".slideshow-container").show();
					
				});
				//click on the "X" to exit the slideshow
				$(".fa-times").click(function() {
					$(".slideshow-container").hide();
				});*/
		
					
/*
					set up buttons to change pics
					$("#right").click(function() {
						slides.cycle('next');
					});
					$("#left").click(function() {
						slides.cycle('prev');
					});

					//hover over arrows to change appearance
					$('.arrow').hover(function() {
						$(this).toggleClass("arrow-background");
					});

*/

		}); //end .done()

	}; //end searchPics


