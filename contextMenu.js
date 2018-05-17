'use strict';
const path = require('path');
const electron = require('electron');

const iconPath = path.join(__dirname, 'static/Icon.png');

function ctxTpl(win, app) {
  return [
		{
			label: 'Play',
			click: function (e) { return win.send('play')	}		
		},
    {
			label: 'Next Track',
			click: () => win.send('next')			
		},
		{
			type: 'separator'
		},
		{
			label: 'Like', 
			click: () => win.send('like')
		},
		{
			label: 'Dislike', 
			click: () => win.send('dislike')
		},
		{
			type: 'separator'
		},
		{
			label: 'Show App', click: function () {
					win.show();
			}
		},
		{
			label: 'Quit', click: function () {
					//isQuitting = true;
					app.quit();
			}
		}
  ]
}

exports.create = (win, app) => {
  const ctxMenu = electron.Menu.buildFromTemplate(ctxTpl(win, app));
  const appIcon = new electron.Tray(iconPath);

  appIcon.setContextMenu(ctxMenu);
	appIcon.addListener('click', (e)=>{
		e.preventDefault();
		if (win.isVisible()){
			win.hide();
		} else {
			win.show();
		}
	})

  win.on('show', function () {
		appIcon.setHighlightMode('always')
	})

}


	