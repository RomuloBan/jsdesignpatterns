'use strict';

require.config({
	paths: {
	  es6: "../../node_modules/requirejs-babel/es6",
	  babel: "../../node_modules/requirejs-babel/babel-5.8.22.min"
	}
});

define([
	'queue/controller',
	'player/controller',
	'utils/timer',
	'header/view',
	'utils/pubsub'
	], function(QueueController, PlayerController, Timer, HeaderView, PubSub) {

var queueController = new QueueController({ autoload: true, autorender: true, autoplay: true});

Timer.setTimeout(2, function() {
		PubSub.trigger('request:player:pause');
});

 
});

