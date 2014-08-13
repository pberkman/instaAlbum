$(document).ready(function() {
	//initiate ajax call on page load
	var hashtag = $("#search").val();
	searchPics(hashtag);

	//hover over icons
	$("p .fa-heart").hover(function() {
		$(this).toggleClass("bigger");
	});
	$("p .fa-question").hover(function() {
		$(this).toggleClass("bigger");
	});

	//click on heart or question icon to get information
	$(".fa-heart").on("click",function () {
		//clear out gallery
		$(".gallery").html("");
		$(".directions").hide();
		$(".createAlbum").show();
	});
	$(".fa-question").on("click",function () {
		//clear out gallery
		$(".gallery").html("");
		$(".directions").show();
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
			var results = '<div class="gallery-wrapper">';
			var slideResults = '<div id="slides">';
			$.each(getPhotos.data, function(index, photo) {
				results += '<div class="imageWrapper">';
				slideResults += '<div class="slideImageWrapper">';
				results += '<img src="' + photo.images.thumbnail.url + '"/>';
				slideResults += '<img src="' + photo.images.standard_resolution.url + '"/>';
				results += '<div class="caption">' + photo.caption.text + '</div>';
				slideResults += '<div class="caption">' + photo.caption.text + '</div>';
				results += '</div>';
				slideResults += '</div>';
			});
				results += '</div>';
				slideResults += '</div>';
				$(".gallery").html(results);
				$(".slides-wrapper").html(slideResults);

				//click on image to bring up slideshow
				$(".imageWrapper").click(function() {
					//show slideshow box
					$(".slideshow-container").show();

					//initiate slider
					var slides = $("#slides");
					slides.cycle({
						fx:'scrollHorz'
					}).cycle("pause");

					//set up buttons to change pics
					$("#right").click(function() {
						slides.cycle('next');
					});
					$("#left").click(function() {
						slides.cycle('prev');
					});
				});
		
		}); //end .done()

		//hover over arrows to change appearance
		$('.arrow').hover(function() {
				$(this).toggleClass("arrow-background");
			});
	}; //end searchPics