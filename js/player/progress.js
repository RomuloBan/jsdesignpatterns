define([], function() {

	var playerProgressElement = document.getElementById('player-progress')
	  , playerProgress = 0;

	function setPlayerProgress(floatValue){
		playerProgress = floatValue;
		playerProgressElement.style.width = Math.round(floatValue * 10000)/100 + '%';
	}

	return {
		set progress(value) {
			setPlayerProgress(value);
		},
		get progress() {
			return playerProgress;
		}
	};
});