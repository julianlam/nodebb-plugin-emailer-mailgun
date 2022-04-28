'use strict';

/* globals app, $, socket, define */

define('admin/plugins/emailer-mailgun', ['settings'], (Settings) => {
	const Module = {};

	Module.init = () => {
		Settings.load('mailgun', $('.emailer-settings'));

		$('#save').on('click', () => {
			Settings.save('mailgun', $('.emailer-settings'), () => {
				app.alert({
					type: 'success',
					alert_id: 'mailgun-saved',
					title: 'Settings Saved',
					message: 'Click here to reload NodeBB',
					timeout: 2500,
					clickfn: function () {
						socket.emit('admin.reload');
					},
				});
			});
		});
	};

	return Module;
});
