var	fs = require('fs'),
	path = require('path'),

	winston = module.parent.require('winston'),
	Meta = module.parent.require('./meta'),

	Emailer = {},
	Mailgun;

Emailer.init = function(app, middleware, controllers) {
	function render(req, res, next) {
		res.render('admin/plugins/emailer-mailgun', {});
	}

	Meta.settings.get('mailgun', function(err, settings) {
		Mailgun = require('mailgun-js')(settings['apiKey'], settings['domain']);
	});

	app.get('/admin/plugins/emailer-mailgun', middleware.admin.buildHeader, render);
	app.get('/api/admin/plugins/emailer-mailgun', render);
};

Emailer.send = function(data) {
	Mailgun.messages.send({
		to: data.to,
		subject: data.subject,
		from: data.from,
		html: data.html,
		text: data.plaintext
	}, function (err, response, body) {
		if (!err) {
			winston.info('[emailer.mailgun] Sent `' + data.template + '` email to uid ' + data.uid);
		} else {
			winston.warn('[emailer.mailgun] Unable to send `' + data.template + '` email to uid ' + data.uid + '!!');
			winston.error('[emailer.mailgun] ' + message);
		}
	});
};

Emailer.admin = {
	menu: function(custom_header, callback) {
		custom_header.plugins.push({
			"route": '/plugins/emailer-mailgun',
			"icon": 'fa-envelope-o',
			"name": 'Emailer (MailGun)'
		});

		callback(null, custom_header);
	}
};

module.exports = Emailer;