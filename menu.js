'use strict';
const os = require('os');
const path = require('path');
const electron = require('electron');

const app = electron.app;
const shell = electron.shell;
const appName = app.getName();

const helpSubmenu = [
	{
		label: `${appName} Website`,
		click() {
			shell.openExternal('https://github.com/dedpnd/yaradio');
		}
	},
	{
		label: 'Report an Issue...',
		click() {
			const body = `
<!-- Please succinctly describe your issue and steps to reproduce it. -->

-

${app.getName()} ${app.getVersion()}
Electron ${process.versions.electron}
${process.platform} ${process.arch} ${os.release()}`;

			shell.openExternal(`https://github.com/dedpnd/yaradio/issues/new?body=${encodeURIComponent(body)}`);
		}
	}
];

if (process.platform !== 'darwin') {
	helpSubmenu.push(
		{
			type: 'separator'
		},
		{
			role: 'about',
			click() {
				electron.dialog.showMessageBox({
					title: `About ${appName}`,
					message: `${appName} ${app.getVersion()}`,
					detail: 'Created by Maxim Ponomarev',
					icon: path.join(__dirname, 'static/Icon.png')
				});
			}
		}
	);
}

function darwinTpl(win) {
	return [
		{
			label: appName,
			submenu: [
				{
					role: 'about'
				},
				{
					type: 'separator'
				},
				{
					label: 'HQ',
					click: () => win.send('HQ')
				},
				{
					label: 'Mute',
					accelerator: 'M',
					click: () => win.send('mute')
				},
				{
					type: 'separator'
				},
				{
					role: 'services',
					submenu: []
				},
				{
					type: 'separator'
				},
				{
					role: 'hide'
				},
				{
					role: 'hideothers'
				},
				{
					role: 'unhide'
				},
				{
					type: 'separator'
				},
				{
					role: 'quit'
				}
			]
		},
		{
			label: 'Station',
			submenu: [
				{
					label: 'Play',
					// accelerator: 'Space',
					click: () => win.send('play')
				},
				{
					label: 'Next Track',
					// accelerator: 'L',
					click: () => win.send('next')
				},
				{
					type: 'separator'
				},
				{
					label: 'Like',
					// accelerator: 'F',
					click: () => win.send('like')
				},
				{
					label: 'Dislike',
					// accelerator: 'D',
					click: () => win.send('dislike')
				},
				{
					type: 'separator'
				},
				{
					label: 'Preferences...',
					accelerator: 'Cmd+,',
					click: () => win.send('preferences')
				}
			]
		},
		{
			role: 'window',
			submenu: [
				{
					role: 'minimize'
				},
				{
					role: 'close'
				},
				{
					type: 'separator'
				},
				{
					role: 'front'
				},
				{
					role: 'togglefullscreen'
				},
				{
					type: 'separator'
				}
			]
		},
		{
			role: 'help',
			submenu: helpSubmenu
		}
	];
}

function otherTpl(win) {
	return [
		{
			label: 'Station',
			submenu: [
				{
					label: 'Play',
					// accelerator: 'Space',
					click: () => win.send('play')
				},
				{
					label: 'Next Track',
					// accelerator: 'L',
					click: () => win.send('next')
				},
				{
					type: 'separator'
				},
				{
					label: 'Mute',
					accelerator: 'M',
					click: () => win.send('mute')
				},
				{
					type: 'separator'
				},
				{
					label: 'Like',
					// accelerator: 'F',
					click: () => win.send('like')
				},
				{
					label: 'Dislike',
					// accelerator: 'D',
					click: () => win.send('dislike')
				},
				{
					type: 'separator'
				},
				{
					label: 'Preferences...',
					accelerator: 'Cmd+,',
					click: () => win.send('preferences')
				}
			]
		},
		{
			type: 'separator'
		},
		{
			label: 'HQ',
			click: () => win.send('HQ')
		},
		{
			label: 'Mute',
			accelerator: 'M',
			click: () => win.send('mute')
		},
		{
			role: 'help',
			submenu: helpSubmenu
		},
		{
			type: 'separator'
		},
		{
			role: 'quit'
		}
	];
}

exports.create = win => {
	const tpl = process.platform === 'darwin' ? darwinTpl(win) : otherTpl(win);
	const menu = electron.Menu.buildFromTemplate(tpl);
	electron.Menu.setApplicationMenu(menu);
};
