 $(document).ready(function() {
	var hashtag = $("#search").val();
	searchWorld(hashtag);

	$("form").submit(function (evt) {
		evt.preventDefault();
		// clear the gallery before a submit
		$(".gallery-wrapper").html("");
		
		var hashtag = $("#search").val();
		searchWorld(hashtag);
	}); //end submit
}); //end ready	
	
	var searchWorld = function(hashtag) {
	
		var getPhotos = $.ajax ({
			url:"https://api.instagram.com/v1/tags/" + hashtag + "/media/recent?client_id=920d83e2718741b885af9d6323a498b4",
			dataType:"jsonp",
			type:"GET"
		})
		.done(function(getPhotos) {
			var results = '<div class="gallery-wrapper">';
			$.each(getPhotos.data, function(index, photo) {
				results += '<div class="imageWrapper">';
				results += '<img src="' + photo.images.thumbnail.url + '"/>';
				results += '<div class="caption">' + photo.caption.text + '</div>';
				results += '</div>';
				//if (photo.location.name !== undefined) {
			});
				results += '</div>';
				$(".gallery").html(results);
		});
	};

/*
$(document).ready(function() {

$("form").submit(function(evt) {
	evt.preventDefault();
	var $searchField = $("#search");
	var submitButton = $("#submit");

	//URL for getJSON
	var instagramAPI = "https://api.instagram.com/v1/media/search?client_id=920d83e2718741b885af9d6323a498b4";
	
	var hashtag = $searchField.val();
	//data for JSON
	var instagramOptions = {
		tags:hashtag,
		lat:48.85544,
		lng:2.294351,
		format:"json",
		distance:5000
	};

	//callback for getJson
	function displayPhotos(data) {
		var photoHTML = '<div class="gallery-wrapper">';
		$.each(data.data, function(i, photo) {
			photoHTML += '<div class="imageWrapper">';
			photoHTML += '<img src="' + photo.images.thumbnail.url + '"/></div>';
			//photoHTML += '<div class="location"' + photo.location.name + '</div></div>';
		});
		photoHTML += '</div>';
		$(".gallery-wrapper").html(photoHTML);
	}
	$.getJSON(instagramAPI, instagramOptions, displayPhotos);
}); // end form submit
}); // end ready */