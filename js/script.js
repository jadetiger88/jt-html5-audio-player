var song ="media/Linkin Park - A Place For My Head.mp3"; 
var audio = new Audio(song); 

$(document).ready(function() {

	$('#play').click(function() {
		audio.play();
		$('#play').hide(); 
		$('#pause').show();
		$(audio).bind('timeupdate', showProgress); 
	}); 

	$('#stop').click(function() {
		audio.pause();
		audio.currentTime = 0; 
		$('#play').show(); 
		$('#pause').hide();
	}); 

	$('#pause').click(function() {
		audio.pause();
		$('#play').show(); 
		$('#pause').hide();
	}); 

	$('#volumeSilder').change(function() {
		audio.volume = parseFloat(this.value/100); 
	})

});

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

		currentTime 	= formatTime(audio.currentTime); 
		totalTime 		= formatTime(audio.duration); 
		$('#time').html(currentTime+'/'+ totalTime);

		if (audio.currentTime > 0) {
			value = Math.floor ((audio.currentTime/audio.duration) * 100);
		}
		$('#bar').css('width', value+"%"); 
}
