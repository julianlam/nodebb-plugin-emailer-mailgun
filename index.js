'use strict';

const axios = require('axios');

const winston = require.main.require('winston');

const meta = require.main.require('./src/meta');

const Emailer = module.exports;

const FormData = require('form-data');
const Mailgun = require('mailgun.js');

const mailgun = new Mailgun(FormData);
let mg;

Emailer.init = async (params) => {
	function render(req, res) {
		res.render('admin/plugins/emailer-mailgun', {});
	}

	const { apiKey, domain, eu } = await meta.settings.get('mailgun');
	if (apiKey && domain) {
		const options = { username: 'api', key: apiKey };
		if (eu === 'on') {
			options.url = 'https://api.eu.mailgun.net';
		}

		mg = mailgun.client(options);
	} else {
		winston.error('[plugins/emailer-mailgun] API key or Domain not set!');
	}

	params.router.get('/admin/plugins/emailer-mailgun', params.middleware.admin.buildHeader, render);
	params.router.get('/api/admin/plugins/emailer-mailgun', render);
};

Emailer.send = async (data) => {
	if (!mg) {
		winston.error('[emailer.mailgun] Mailgun is not set up properly!');
		return data;
	}

	// const { domain } = await meta.settings.get('mailgun');

	try {
		// await mg.messages.create(domain, {
		// 	to: data.to,
		// 	subject: data.subject,
		// 	from: data.from,
		// 	html: data.html,
		// 	text: data.plaintext,
		// });
		await send(data);
		winston.verbose(`[emailer.mailgun] Sent \`${data.template}\` email to uid ${data.uid}`);
	} catch (err) {
		console.log(err);
		winston.warn(`[emailer.mailgun] Unable to send \`${data.template}\` email to uid ${data.uid}!!`);
		winston.error(`[emailer.mailgun] (${err.message})`);
	}

	return data;
};

// https://github.com/mailgun/mailgun.js/issues/92#issuecomment-1508374854
async function send(data) {
	const formData = new FormData()
	formData.append('from', data.from);
	formData.append('to', data.to);
	formData.append('subject', data.subject);
	formData.append('html', data.html);
	if (data.plaintext) {
		formData.append('text', data.plaintext);
	}
	const { apiKey, domain, eu } = await meta.settings.get('mailgun');
	axios({
		method: 'post',
		url: eu === 'on' ?
			`https://api.eu.mailgun.net/v3/${domain}/messages` :
			`https://api.mailgun.net/v3/${domain}/messages`,
		auth: {
			username: 'api',
			password: apiKey,
		},
		headers: {
			...formData.getHeaders()
		},
		data: formData
    });
}

Emailer.admin = {
	menu: function (custom_header, callback) {
		custom_header.plugins.push({
			route: '/plugins/emailer-mailgun',
			icon: 'fa-envelope-o',
			name: 'Emailer (MailGun)',
		});

		callback(null, custom_header);
	},
};


