var express = require('express');
var router = express.Router();
var _ = require('lodash');
var nodemailer = require('nodemailer');
var smtpConfig = require('../../data/smtp.config.json');

// Router
// -- index.html
router.get( '/', ( req, res ) => {
  res.render( 'index' );
});

router.post( '/contact', ( req, res ) => {
  let {name, email, website, referred, budget, timeline, message} = req.body;

  if ( !name || !message || !email ) {
    res.send({ status: 0, data: 'Sorry, you need to fill the required inputs in order to send the email' });
    return false;
  }

  // create reusable transporter object using the default SMTP transport
  var transporter = nodemailer.createTransport(`smtp://${smtpConfig.email}:${smtpConfig.password}@${smtpConfig.server}`);

  // setup e-mail data with unicode symbols
  var mailOptions = {
    from: `"${name}" <${email}>"`, // sender address
    to: 'dan256_6@hotmail.com', // list of receivers
    subject: `Quotation project - ${name}`, // Subject line
    html: `
      <style>td { padding: 7.5px 15px; font-size: 16px; }</style>
      <table>
        <tbody>
          <tr><td>Name: </td><td>${name}</td></tr>
          <tr><td>Email: </td><td>${email}</td></tr>
          <tr><td>Website: </td><td>${website}</td></tr>
          <tr><td>Referred: </td><td>${referred}</td></tr>
          <tr><td>Budget: </td><td>${budget}</td></tr>
          <tr><td>Start day: </td><td>${timeline}</td></tr>
          <tr><td>Project description: ${message}</td></tr>
        </tbody>
      </table>`
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      res.send({ status: 0, data: 'Sorry, there was a problem trying to send the email' });
      console.log(error);
    }

    res.send({ status: 1, data: 'Thank you! email sent successfully. I will contact with you as soon as possible :)' });
  });
});

router.get( '*', ( req, res ) => {
  res.render( '404' );
});

module.exports = router;
