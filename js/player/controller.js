'use strict';

define([
		'player/progress',
		'utils/timer',
		'utils/dom', 
		'utils/pubsub'
	], function(playerProgressBar, Timer, D$, PubSub) {
	var playerTitle = document.getElementById('player-title')
  , playerButtonPlay = document.getElementById('player-button-play')
  , playerButtonPlayIcon = document.getElementById('player-button-play-icon')
  ,playerState = {
  	  track: null
  	, isPlaying: false
  	, progress: 0
  	, interval: null
  };




function playTrack(track){
	//Do nothing if is the same track and player already playing
	if(track === playerState.track && playerState.isPlaying) return false;

	//If same track, just play forward
	if(track !== playerState.track) {
		playerState.track = track;
		playerTitle.innerHTML = track.title;
		playerProgressBar.progress = 0;
	}

	playerState.isPlaying = true;
	PubSub.trigger('player:play', track);
	setButtonState('pause');

	playerProgressBar.progress = playerState.progress / playerState.track.duration;
	playerState.interval = Timer.setInterval(0.5, function() {
		playerState.progress += 0.5;

		if(playerState.progress <= playerState.track.duration) {
			playerProgressBar.progress = playerState.progress / playerState.track.duration;

		} else {
			clearInterval(playerState.interval);
			playerState.interval = null;
			playerState.progress = 0;

			playNextTrack();
		}
	});

}

function setButtonState (state) {
	D$.removeClass(playerButtonPlayIcon, 'glyphicon-play');
	D$.removeClass(playerButtonPlayIcon, 'glyphicon-pause');
	D$.addClass(playerButtonPlayIcon, 'glyphicon-' + state);
}

function pauseTrack() {
	if (!playerState.isPlaying) return false;
	playerState.isPlaying = false;
	setButtonState('play');
	PubSub.trigger('player:pause');
	clearInterval(playerState.interval);
	playerState.interval = null;

}

function playNextTrack() {

	PubSub.trigger('request:queue:next');
}

D$.on(playerButtonPlay, 'click', function(evt) {
	evt.preventDefault();
	if(playerState.isPlaying) {
		pauseTrack();
	} else {
		if (playerState.track !== null) {
			playTrack(playerState.track);
		} else {
			PubSub.trigger('request:queue:next');
		}
	}
});

PubSub.on('request:player:play', function(trackData) {
	playTrack(trackData);
});

PubSub.on('request:player:pause', function() {
	pauseTrack();
});

	

});