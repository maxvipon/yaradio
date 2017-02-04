'use strict';
const Config = require('electron-config');

module.exports = new Config({
	defaults: {
		lastWindowState: {
			width: 800,
			height: 700
		},
		element: {
			prefButton: '.page-root .settings',
			prefDialog: '.page-root .settings-stream.popup',
			mute: '.page-root .volume__icon',
			play: '.page-station .player-controls__play',
			next: '.page-station .slider__item_next',
			like: '.page-station .button.like_action_like',
			dislike: '.page-station .button.like_action_dislike',
			activeStation: '.page-index .station_playing'
		}
	}
});
