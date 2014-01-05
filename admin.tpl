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
				Register for an account on <a href="http://mailgun.com">http://mailgun.com</a>. Mailgun offers a free tier with up to 10,000 free emails daily.
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

<form role="form">
	<fieldset>
		<div class="form-group">
			<label for="mailgun:apiKey">API Key</label>
			<input type="text" class="form-control" id="mailgun:apiKey" data-field="mailgun:apiKey" />
		</div>

		<button class="btn btn-lg btn-primary" id="save">Save</button>
	</fieldset>
</form>

<script type="text/javascript">
	require(['forum/admin/settings'], function(Settings) {
		Settings.prepare();
	});
</script>