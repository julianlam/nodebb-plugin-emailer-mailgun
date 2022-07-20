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
				Register for an account on <a href="http://mailgun.com">http://mailgun.com</a>.
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

<div class="alert alert-info">
	<strong>⚠️ Mailgun is not a free service</strong>
	<p>
		Many emailer services have severely limited their free tiers, or removed them altogether.
		If you are looking for a free emailer service, our current recommendation is <a href="https://github.com/julianlam/nodebb-plugin-emailer-sendgrid/">the SendGrid plugin</a>.
	</p>
	<p>
		As of 20 Jul 2022, Mailgun's "Trial" tier offers 5000 email messages for <strong>one month</strong>. As per the Mailgun website:
		<blockquote>After your trial, you will be moved to the Foundation 50k, but you can always select pay-as-you-go or a different plan of your choice.</blockquote>
		<em>N.B. The Foundation 50k plan is a $35/mo tier</em>
	</p>
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

		<div class="checkbox">
			<label for="eu" class="mdl-switch mdl-js-switch mdl-js-ripple-effect">
				<input type="checkbox" class="mdl-switch__input" id="eu" name="eu">
				<span class="mdl-switch__label"><strong>Account is hosted in the EU</strong></span>
			</label>
		</div>

		<button class="btn btn-lg btn-primary" id="save" type="button">Save</button>
	</fieldset>
</form>
