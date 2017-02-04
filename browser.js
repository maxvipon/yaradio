'use strict';
const electron = require('electron');

const ipc = electron.ipcRenderer;
const webFrame = electron.webFrame;

const el = {
	prefButton: '.page-root .settings',
	prefDialog: '.settings-stream.popup',
	mute: '.page-root .volume',
	play: '.page-station .player-controls__play',
	next: '.page-station .slider__item_next',
	like: '.page-station .button.like_action_like',
	dislike: '.page-station .button.like_action_dislike',
	activeStation: '.page-index .station_playing'
};

function exec(command) {
	webFrame.executeJavaScript(`if (!window.a) a = new Mu.Adapter(); ${command};`);
}

function click(s) {
	const e = document.querySelector(s);
	if (e) {
		e.click();
	}
}

ipc.on('preferences', () => {
	click(el.prefButton);
	window.setTimeout(() => {
		let w = document.documentElement.scrollWidth / 2 | 0;
		let h = document.documentElement.scrollHeight / 2 | 0;
		let pref = document.querySelector(el.prefDialog);
		let pw = pref.offsetWidth / 2 | 0;
		let ph = pref.offsetHeight / 2 | 0;
		pref.style.top = `${h - ph}px`;
		pref.style.left = `${w - pw}px`;
	}, 25);
});

ipc.on('log-out', () => {

});

ipc.on('play', () => exec('a.togglePause()'));
ipc.on('next', () => exec('a.next()'));
ipc.on('like', () => click(el.like));
ipc.on('dislike', () => click(el.dislike));
ipc.on('mute', () => exec('a.mute()'));
ipc.on('HQ', () => exec('a.toggleHQ()'));
