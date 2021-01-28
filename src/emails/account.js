const sgMail = require("@sendgrid/mail");

const sendgridAPIKey = "YOUR_SENDGRID_API_KEY";

sgMail.setApiKey(sendgridAPIKey);

sgMail.send({
  to: "nepta@gmail.com", //
  from: "rimk@redimail.com", // app user
  subject: "Report of a User",
  text: "TwineIn email testing",
});
