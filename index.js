var	fs = require('fs'),
	path = require('path'),

	winston = module.parent.require('winston'),
	Meta = module.parent.require('./meta'),

	Mailgun = require('mailgun-js')(Meta.config['mailgun:apiKey'], Meta.config['mailgun:domain']),
	Emailer = {};

Emailer.send = function(data) {
	// Update the API key, if necessary
	// if (PostageApp.getApiKey && PostageApp.setApiKey && PostageApp.getApiKey() !== Meta.config['postageapp:apiKey']) {
	// 	PostageApp.setApiKey(Meta.config['postageapp:apiKey']);
	// }

	mailgun.messages.send({
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
}

Emailer.admin = {
	menu: function(custom_header, callback) {
		custom_header.plugins.push({
			"route": '/plugins/emailer-mailgun',
			"icon": 'fa-envelope-o',
			"name": 'Emailer (MailGun)'
		});

		return custom_header;
	},
	route: function(custom_routes, callback) {
		fs.readFile(path.join(__dirname, 'admin.tpl'), function(err, tpl) {
			custom_routes.routes.push({
				route: '/plugins/emailer-mailgun',
				method: "get",
				options: function(req, res, callback) {
					callback({
						req: req,
						res: res,
						route: '/plugins/emailer-mailgun',
						name: 'Emailer (Mailgun)',
						content: tpl
					});
				}
			});

			callback(null, custom_routes);
		});
	}
};

module.exports = Emailer;