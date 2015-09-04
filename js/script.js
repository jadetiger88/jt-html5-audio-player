var songElement;
var audio;


$(document).ready(function() {

	songElement = $('#playlist li:first-child'); 
	setupAudioPlayer(songElement); 

	$('#play').click(function() {
		audioPlay();
	}); 

	$('#stop').click(function() {
		audioStop();
	}); 

	$('#pause').click(function() {
		audioPause();
	}); 

	$('#next').click(function() {
		audioPause(); 

		var next = $('#playlist li.active').next();
		if(next.length == 0) {
			next = $('#playlist li:first-child');
		}
		setupAudioPlayer(next);
		audioPlay();
	});

	$('#prev').click(function() {
		audioPause(); 

		var prev = $('#playlist li.active').prev();
		if(prev.length == 0) {
			prev = $('#playlist li:last-child');
		}
		setupAudioPlayer(prev);
		audioPlay();
	});

	$('#volumeSilder').change(function() {
		audio.volume = parseFloat(this.value/100); 
	})

	$('#durationSilder').mousedown(function() {
		audioPause();
	});

	$('#durationSilder').mouseup(function() {
		audio.currentTime = (audio.duration*this.value/100); 
		audioPlay();
	});


	$('#playlist li').click(function() {

		// change the active class
		$('#playlist li.active').removeClass('active');
		$(this).addClass('active');

		// Stop current song and play the new one 
		audioStop();
		setupAudioPlayer($(this));
		audioPlay();
	});
});

function audioPlay() {
	audio.play();
	$('#play').hide(); 
	$('#pause').show();
	$(audio).bind('timeupdate', showProgress); 
}

function audioPause() {
	audio.pause();
	$('#play').show(); 
	$('#pause').hide();
	$(audio).unbind('timeupdate', showProgress); 
	showProgress();	
}

function audioStop() {
	audioPause();
	audio.currentTime = 0; 
}

function formatTime(seconds) {
		var sec = parseInt(seconds % 60); 
		var min = parseInt(seconds / 60) % 60; 

		if (sec < 10) {
			sec = '0' + sec; 
		}

		if (min < 10 ) {
			min = '0' + min;
		}

		return (min+':'+sec); 

}

function showProgress() {

	var currentTime 	= formatTime(audio.currentTime); 
	var totalTime 		= formatTime(audio.duration); 
	$('#time').html(currentTime+'/'+ totalTime);

	var value = 0; 
	if (audio.currentTime >= 0) {
		value = Math.floor ((audio.currentTime/audio.duration) * 100);
	}

	$('#bar').css('width', value+"%"); 
	$('#durationSilder').val(value);
}

function setupAudioPlayer(element) {

	var songPrefix = "media/Linkin Park - "; 
	var songPostfix = ".mp3";
	var coverPrefix  = "img/covers/"; 

    // Get items info from the html
	var title =  element.text(); 
	var cover =  element.attr('cover'); 
	var artist =  element.attr('artist'); 


	// Set items to be display on the audio player
	$('#albumTitle').text(artist+ ": "); 
	$('#songTitle').text(title); 
	$('#albumCover img').attr('src', coverPrefix+cover);
	$('#playlist li.active').removeClass('active');
	element.addClass('active'); 

	// Init audio
	audio = new Audio(songPrefix+title+songPostfix); 
	$(audio).bind('loadedmetadata', showProgress); 
}
