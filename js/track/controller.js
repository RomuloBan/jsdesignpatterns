'use strict';

define(['track/model', 'track/view', 'utils/pubsub'], function(TrackModel, TrackView, PubSub) {

	function TrackController(data) {
		this.model = TrackModel(data);
		this.view = new TrackView(this.model, this);
		this.hookGlobalEvents();
	}

	TrackController.prototype.show = function() {
		this.view.render();
	};

	TrackController.prototype.hookGlobalEvents = function() {
		PubSub.on('player:play', function(track) {
			if(track.id === this.model.get('id')) {
				this.model.set('isActive', true);
			} else {
				this.model.set('isActive', false);
			}
		}, this);
	};

	return TrackController;

});