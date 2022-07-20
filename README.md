# NodeBB Emailer (Mailgun)

This NodeBB plugin allows NodeBB to send emails to users through the third-party transactional email service [Mailgun](http://mailgun.com).

To customise options for this plugin, please consult the "Emailer (Mailgun)" page in the administration panel, under the "Plugins" heading.

## Installation

    npm install nodebb-plugin-emailer-mailgun

## ⚠️ Mailgun is not a free service

Many emailer services have severely limited their free tiers, or removed them altogether.
If you are looking for a free emailer service, our current recommendation is [the SendGrid plugin](https://github.com/julianlam/nodebb-plugin-emailer-sendgrid/).

As of 20 Jul 2022, Mailgun's "Trial" tier offers 5000 email messages for **one month**. As per the Mailgun website:

> After your trial, you will be moved to the Foundation 50k, but you can always select pay-as-you-go or a different plan of your choice.

*N.B. The Foundation 50k plan is a $35/mo tier*