var	fs = require('fs'),
	path = require('path'),

	winston = module.parent.require('winston'),
	Meta = module.parent.require('./meta'),

	Emailer = {},
	Mailgun = require('mailgun-js'),
	server;

Emailer.init = function(params, callback) {
	function render(req, res, next) {
		res.render('admin/plugins/emailer-mailgun', {});
	}

	Meta.settings.get('mailgun', function(err, settings) {
		if (!err && settings && settings.apiKey && settings.domain) {
			server = Mailgun({
				apiKey: settings.apiKey,
				domain: settings.domain
			});
		} else {
			winston.error('[plugins/emailer-mailgun] API key or Domain not set!');
		}
	});

	params.router.get('/admin/plugins/emailer-mailgun', params.middleware.admin.buildHeader, render);
	params.router.get('/api/admin/plugins/emailer-mailgun', render);

	callback();
};

Emailer.send = function(data, callback) {
	if (!server) {
		winston.error('[emailer.mailgun] Mailgun is not set up properly!')
		return callback(null, data);
	}

	server.messages().send({
		to: data.to,
		subject: data.subject,
		from: data.from,
		html: data.html,
		text: data.plaintext
	}, function (err, body) {
		if (!err) {
			winston.verbose('[emailer.mailgun] Sent `' + data.template + '` email to uid ' + data.uid);
		} else {
			winston.warn('[emailer.mailgun] Unable to send `' + data.template + '` email to uid ' + data.uid + '!!');
			winston.error('[emailer.mailgun] (' + err.message + ')');
		}

		return callback(err, data);
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
