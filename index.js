'use strict';

const winston = require.main.require('winston');
const meta = require.main.require('./src/meta');

const Emailer = {};

const formData = require('form-data');
const Mailgun = require('mailgun.js');
const mailgun = new Mailgun(formData);
let mg;

Emailer.init = async (params) => {
	function render(req, res, next) {
		res.render('admin/plugins/emailer-mailgun', {});
	}

	const { apiKey, domain } = await meta.settings.get('mailgun');
	if (apiKey && domain) {
		mg = mailgun.client({ username: 'api', key: apiKey });
	} else {
		winston.error('[plugins/emailer-mailgun] API key or Domain not set!');
	}

	params.router.get('/admin/plugins/emailer-mailgun', params.middleware.admin.buildHeader, render);
	params.router.get('/api/admin/plugins/emailer-mailgun', render);
};

Emailer.send = async (data) => {
	if (!mg) {
		winston.error('[emailer.mailgun] Mailgun is not set up properly!')
		return callback(null, data);
	}

	const { domain } = await meta.settings.get('mailgun');

	try {
		await mg.messages.create(domain, {
			to: data.to,
			subject: data.subject,
			from: data.from,
			html: data.html,
			text: data.plaintext
		});
		winston.verbose('[emailer.mailgun] Sent `' + data.template + '` email to uid ' + data.uid);
	} catch (err) {
		console.log(err);
		winston.warn('[emailer.mailgun] Unable to send `' + data.template + '` email to uid ' + data.uid + '!!');
		winston.error('[emailer.mailgun] (' + err.message + ')');
	}

	return data;
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
