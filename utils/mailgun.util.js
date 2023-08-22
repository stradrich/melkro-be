const formData = require('form-data');
const Mailgun = require('mailgun.js');
// const Mailgun = require('mailgun-js');
const mailgun = new Mailgun(formData);
const mg = mailgun.client({
    username: 'api',
    key: process.env.MAILGUN_API_KEY
})

module.exports = {
    mg
}


// Replace 'YOUR_API_KEY' and 'YOUR_DOMAIN' with your actual Mailgun API key and domain
// const mg = mailgun({ apiKey: process.env.MAILGUN_API_KEY, domain: process.env.MAILGUN_DOMAIN });

// module.exports = {
//     mg
// };
