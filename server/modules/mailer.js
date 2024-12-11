const path = require('path');
const nodemailer = require('nodemailer');
const sgMail = require('@sendgrid/mail');
const hbs = require('nodemailer-express-handlebars');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const transport = nodemailer.createTransport({
  send: (mailOptions, callback) => {
    const msg = {
      to: mailOptions.data.to,
      from: mailOptions.data.from,
      subject: mailOptions.data.subject,
      text: mailOptions.data.text,
      html: mailOptions.data.html,
    };

    // Envia o e-mail usando a API do SendGrid
    sgMail
      .send(msg)
      .then(() => callback(null, { response: 'E-mail enviado com sucesso!' }))
      .catch((error) => callback(error));
  },
});

transport.use(
  'compile',
  hbs({
    viewEngine: {
      defaultLayout: undefined,
      partialsDir: path.resolve('./server/resources/mail/'),
    },
    viewPath: path.resolve('./server/resources/mail/'),
    extName: '.html',
  })
);

module.exports = transport;
