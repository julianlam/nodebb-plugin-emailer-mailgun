<div class="acp-page-container">
	<!-- IMPORT admin/partials/settings/header.tpl -->

	<div class="row m-0">
		<div id="spy-container" class="col-12 px-0 mb-4" tabindex="0">
			<blockquote>
				<p>
					Mailgun is a programmable email platform. It allows your application to become a fully featured email server. Send, receive and track messages with ease using your favorite programming language.<br />
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

			<hr />

			<form role="form" class="emailer-settings">
				<fieldset>
					<div class="row mb-3">
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

					<div class="form-check">
						<label for="eu" class="form-check-label">Account is hosted in the EU</label>
						<input type="checkbox" class="form-check-input" id="eu" name="eu" />
					</div>
				</fieldset>
			</form>


		</div>

		<!-- IMPORT admin/partials/settings/toc.tpl -->
	</div>
</div>
