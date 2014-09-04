<h1><i class="fa fa-envelope-o"></i> Emailer (Mailgun)</h1>

<div class="row">
	<div class="col-lg-12">
		<blockquote>
			<p>
				Mailgun is a programmable email platform. It allows your application to become a fully featured email server. Send, receive and track messages with ease using your favorite programming language.<br /><br />
			</p>
			<p>
				Imagination is your limit. Email is not hard anymore.
			</p>
		</blockquote>
		<p>
			To get started:
		</p>
		<ol>
			<li>
				Register for an account on <a href="http://mailgun.com">http://mailgun.com</a>. Mailgun offers a free tier with up to 10,000 free emails monthly.
			</li>
			<li>
				(Optional) Set up a custom domain at <a href="https://mailgun.com/cp/domains/new">https://mailgun.com/cp/domains/new</a>
			</li>
			<li>
				Paste your API key (not your public key) into the field below, hit save, and restart your NodeBB
			</li>
		</ol>
	</div>
</div>

<hr />

<form role="form" class="emailer-settings">
	<fieldset>
		<div class="row">
			<div class="col-sm-6">
				<div class="form-group">
					<label for="apiKey">API Key</label>
					<input type="text" class="form-control" id="apiKey" name="apiKey" />
				</div>
			</div>
			<div class="col-sm-6">
				<div class="form-group">
					<label for="domain">Domain</label>
					<input type="text" class="form-control" id="domain" name="domain" />
				</div>
			</div>
		</div>

		<button class="btn btn-lg btn-primary" id="save" type="button">Save</button>
	</fieldset>
</form>

<script type="text/javascript">
	require(['settings'], function(Settings) {
		Settings.load('mailgun', $('.emailer-settings'));

		$('#save').on('click', function() {
			Settings.save('mailgun', $('.emailer-settings'), function() {
				app.alert({
					type: 'success',
					alert_id: 'mailgun-saved',
					title: 'Settings Saved',
					message: 'Click here to reload NodeBB',
					timeout: 2500,
					clickfn: function() {
						socket.emit('admin.reload');
					}
				});
			});
		});
	});
</script>
